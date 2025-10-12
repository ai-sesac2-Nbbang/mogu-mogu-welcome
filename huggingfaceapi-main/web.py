# --- 1. 필수 라이브러리 임포트 ---
import streamlit as st
from dotenv import load_dotenv
import streamlit.components.v1 as components
import os

# (다른 import 구문들은 이전과 동일)
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from rag_logic import create_and_store_vector_db

# (API 키 로드 부분은 이전과 동일)
load_dotenv()
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")


# --- 2. 페이지 설정 및 CSS ---
st.set_page_config(page_title="모구챗 - My RAG 챗봇", page_icon="avatar.png", layout="centered")
st.markdown("""
<style>
    /* ... (다른 CSS는 이전과 동일) ... */
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');
    html, body, [class*="st-"] { font-family: 'Noto Sans KR', sans-serif; }
    .stApp { background: linear-gradient(135deg, #F9F5FF 0%, #E2E1FF 100%); }
    .st-emotion-cache-1f1G203 { background-color: white; border-radius: 1.5rem; padding: 1.5rem; margin: 1rem; box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1); border: 1px solid rgba(255, 255, 255, 0.18); height: 85vh; padding-bottom: 5rem; }
    [data-testid="stChatMessage"][data-testid-role="assistant"] .st-emotion-cache-124el85 { background-color: #F0F0F5; border-radius: 20px 20px 20px 5px; color: #111; border: 1px solid #E5E7EB; animation: fadeIn 0.5s ease-in-out; }
    
    /* ◀◀◀ 아바타 이미지 크기 조절 CSS ◀◀◀ */
    [data-testid="stChatMessage"] img {
        width: 5rem;  /* 너비 설정 (기본값은 2rem) */
        height: 5rem; /* 높이 설정 (기본값은 2rem) */
        border-radius: 50%;
        object-fit: cover; /* 이미지가 찌그러지지 않도록 설정 */
    }

    [data-testid="stChatMessage"][data-testid-role="user"] .st-emotion-cache-124el85 { background: linear-gradient(45deg, #7A42E2, #9469F4); border-radius: 20px 20px 5px 20px; color: white; animation: fadeIn 0.5s ease-in-out; }
    .faq-card { background-color: rgba(249, 245, 255, 0.8); border: 1px solid rgba(255, 255, 255, 0.3); padding: 1.2rem; border-radius: 1rem; margin-bottom: 1rem; }
    .faq-title { font-size: 18px; font-weight: 700; margin-bottom: 1rem; }
    .stButton>button { background-color: #FFFFFF; color: #555; border: 1px solid #DDD; border-radius: 20px; padding: 8px 16px; transition: all 0.2s ease-in-out; box-shadow: 0 1px 2px rgba(0,0,0,0.05); width: 100%; text-align: left; }
    .stButton>button:hover { background-color: #F0F0F5; color: #7A42E2; border-color: #7A42E2; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    .stChatInput { background-color: #FFFFFF; padding: 1rem; border-top: 1px solid #E5E7EB; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
""", unsafe_allow_html=True)


# --- 3. RAG 챗봇 로직 로드 및 체인 구성 (이전과 동일) ---
@st.cache_resource
def get_rag_chain():
    # ... (내용 변경 없음)
    if not HUGGINGFACE_API_KEY: return None
    vector_db = create_and_store_vector_db()
    retriever = vector_db.as_retriever(search_kwargs={"k": 10})
    llm_endpoint = HuggingFaceEndpoint(repo_id="meta-llama/Meta-Llama-3-8B-Instruct", huggingfacehub_api_token=HUGGINGFACE_API_KEY, temperature=0.3)
    llm = ChatHuggingFace(llm=llm_endpoint)
    # AI의 역할을 매우 엄격하게 제한하는 새로운 시스템 프롬프트
    system_prompt = """
    당신은 '모구서비스'의 규칙을 안내하는 AI 상담원 '모구봇'입니다. 당신의 유일한 임무는 아래에 제공되는 "검색된 문서"의 내용만을 사용하여 사용자의 질문에 답변하는 것입니다.

    --- [규칙] ---
    1. **오직 "검색된 문서"의 내용만을 사용해야 합니다.** 절대로 당신의 사전 지식이나 외부 정보를 사용해서는 안 됩니다.
    2. 답변은 "검색된 문서"에 명시된 사실을 그대로 전달해야 하며, 내용을 추측하거나 변형해서는 안 됩니다.
    3. 만약 "검색된 문서"의 내용만으로 질문에 답변할 수 없다면, 다른 정보를 찾으려 하지 말고 **반드시** "아직 준비되지 않은 정보예요. 곧 업데이트할게요 🙂" 라고만 답변해야 합니다. 다른 말을 덧붙이지 마세요.
    4. 모든 답변은 친절하고 명확한 "요"체로 작성해야 합니다.

    --- [검색된 문서] ---
    {context}
    """
    prompt = ChatPromptTemplate.from_messages([("system", system_prompt), ("human", "{question}")])
    rag_chain = ({"context": retriever, "question": RunnablePassthrough()} | prompt | llm | StrOutputParser())
    return rag_chain

rag_chain = get_rag_chain()


# --- 4. 자동 스크롤 함수 (이전과 동일) ---
def auto_scroll():
    # ... (내용 변경 없음)
    components.html(
        """<script> window.parent.document.querySelector('.st-emotion-cache-1f1G203').scrollTo(0, 99999); </script>""",
        height=0)

# --- 5. UI 렌더링 함수 (이전과 동일) ---
def render_welcome_elements():
    # ... (내용 변경 없음)
    if not st.session_state.messages:
        with st.chat_message("assistant", avatar="avatar.png"):
            st.markdown("궁금한 내용을 입력해주시면,\n답변을 빠르게 챗봇이 도와드릴게요.")
    st.markdown('<div class="faq-card">', unsafe_allow_html=True)
    st.markdown('<div class="faq-title">많이 찾는 질문 TOP 3</div>', unsafe_allow_html=True)
    faq_items = {
        "모구 수수료 제한은 어떻게 되나요?": "💬 모구 수수료 제한",
        "모구 마감 기한은 며칠까지 가능한가요?": "💬 모구 마감 기한",
        "모구에서 팔면 안되는 물건은 무엇인가요?": "💬 모구 판매 금지 품목"
    }
    for query, text in faq_items.items():
        if st.button(text, key=query):
            st.session_state.prompt_from_button = query
            st.rerun()
    st.markdown('</div>', unsafe_allow_html=True)


# --- 6. 메인 애플리케이션 로직 (이전과 동일) ---
st.title("모구챗 ✨")
# ... (이하 모든 코드 변경 없음)

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"], avatar="avatar.png" if message["role"] == "assistant" else "👤"):
        st.markdown(message["content"])

render_welcome_elements()

prompt = st.chat_input("궁금하신 내용을 입력해주세요.")

if "prompt_from_button" in st.session_state and st.session_state.prompt_from_button:
    prompt = st.session_state.prompt_from_button
    st.session_state.prompt_from_button = None

if prompt:
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user", avatar="👤"):
        st.markdown(prompt)

    with st.chat_message("assistant", avatar="avatar.png"):
        if rag_chain:
            response_stream = rag_chain.stream(prompt)
            full_response = st.write_stream(response_stream)
        else:
            full_response = "죄송합니다, 챗봇을 초기화하는 데 문제가 발생했습니다."
            st.write(full_response)
    
    st.session_state.messages.append({"role": "assistant", "content": full_response})
    
    auto_scroll()
    st.rerun()

else:
    auto_scroll()