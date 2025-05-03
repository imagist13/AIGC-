import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiBook, FiCode, FiServer, FiLayers, FiShield, FiHelpCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  // 文档导航项
  const docNavItems = [
    { id: "introduction", title: "项目介绍", icon: <FiBook /> },
    { id: "api", title: "API接口", icon: <FiServer /> },
    { id: "usage", title: "使用指南", icon: <FiLayers /> },
    { id: "security", title: "安全说明", icon: <FiShield /> },
    { id: "code", title: "代码示例", icon: <FiCode /> },
    { id: "faq", title: "常见问题", icon: <FiHelpCircle /> },
  ];

  // 文档内容
  const docContent = {
    introduction: {
      title: "智鉴真言项目介绍",
      content: (
        <div className="space-y-4">
          <p>
            智鉴真言是一个基于先进人工智能技术的文本检测系统，旨在帮助用户识别文本是否由AI生成。
            随着ChatGPT等大型语言模型的普及，AI生成内容与人类创作内容的界限越来越模糊，
            这给学术诚信、新闻真实性和内容审核带来了新的挑战。
          </p>
          <p>
            本项目利用深度学习和自然语言处理技术，通过分析文本的语言特征、结构模式和语义连贯性，
            为用户提供专业、准确的AI文本检测服务。
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">核心功能</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>AI生成文本检测：识别文本是否由AI生成，并提供置信度评分</li>
            <li>多模型支持：支持检测多种主流AI语言模型生成的内容</li>
            <li>详细分析报告：提供语言特征、结构模式等多维度分析</li>
            <li>批量处理：支持多文件批量检测</li>
            <li>API接口：提供开放API，便于集成到其他系统</li>
          </ul>
        </div>
      ),
    },
    api: {
      title: "API接口文档",
      content: (
        <div className="space-y-4">
          <p>
            智鉴真言提供了简单易用的RESTful API，允许开发者将AI文本检测功能集成到自己的应用中。
            所有API请求都使用HTTPS，并返回JSON格式的响应。
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">基础URL</h3>
          <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
            https://api.smartpaper.ai/v1
          </div>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">认证</h3>
          <p>
            所有API请求需要在Header中包含API密钥进行认证：
          </p>
          <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
            Authorization: Bearer YOUR_API_KEY
          </div>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">文本检测API</h3>
          <div className="space-y-2">
            <p><strong>端点：</strong> <code>/detect</code></p>
            <p><strong>方法：</strong> POST</p>
            <p><strong>请求体：</strong></p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
              {`{
  "text": "需要检测的文本内容",
  "mode": "standard" // 可选，检测模式：standard, detailed, academic
}`}
            </div>
            <p><strong>响应：</strong></p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
              {`{
  "result": {
    "ai_probability": 0.92, // AI生成概率
    "human_probability": 0.08, // 人类创作概率
    "confidence": "high", // 置信度：low, medium, high
    "model_detected": "gpt-4", // 可能使用的AI模型
    "features": { // 详细特征分析
      "coherence": 0.85,
      "complexity": 0.76,
      "creativity": 0.65,
      "repetition": 0.32
    }
  },
  "status": "success",
  "processing_time": "0.45s"
}`}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-blue-800 font-medium">
              想要获取API密钥？请<Link to="/auth" className="text-blue-600 underline">注册账号</Link>并前往个人中心申请开发者访问权限。
            </p>
          </div>
        </div>
      ),
    },
    usage: {
      title: "使用指南",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-3">基本使用流程</h3>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>输入文本</strong>：在检测工具页面的文本框中输入或粘贴需要检测的文本内容。
              文本长度建议在100-5000字之间，过短的文本可能会影响检测准确性。
            </li>
            <li>
              <strong>上传文件</strong>：或者，您可以直接上传TXT、PDF或DOC/DOCX格式的文件进行检测。
              系统会自动提取文件中的文本内容。
            </li>
            <li>
              <strong>开始分析</strong>：点击"开始分析"按钮，系统将开始处理您的文本。
              处理时间取决于文本长度，通常在几秒到几十秒不等。
            </li>
            <li>
              <strong>查看结果</strong>：分析完成后，系统会显示详细的检测结果，包括AI生成概率、
              可能使用的AI模型以及文本特征分析等信息。
            </li>
            <li>
              <strong>保存结果</strong>：您可以将检测结果保存为PDF报告，或者将其添加到检测历史中，
              方便日后查看和比较。
            </li>
          </ol>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">检测模式说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-2">标准模式</h4>
              <p className="text-sm text-gray-600">
                适用于一般文本检测，平衡速度和准确性，适合大多数使用场景。
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-2">详细模式</h4>
              <p className="text-sm text-gray-600">
                提供更全面的分析报告，包括更多文本特征和详细解释，但处理时间较长。
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-2">学术模式</h4>
              <p className="text-sm text-gray-600">
                专为学术论文和研究报告设计，更注重学术写作特点和引用分析。
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium mb-2">快速模式</h4>
              <p className="text-sm text-gray-600">
                优先考虑速度，适合需要快速初筛的大量文本，准确性可能略低。
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <p className="text-yellow-800">
              <strong>提示：</strong> 为获得最佳检测效果，建议提供至少300字的文本样本。
              检测结果仅供参考，建议结合人工判断做出最终决策。
            </p>
          </div>
        </div>
      ),
    },
    security: {
      title: "安全说明",
      content: (
        <div className="space-y-4">
          <p>
            智鉴真言高度重视用户数据安全和隐私保护。我们采取了多项措施确保您的文本数据安全：
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">数据处理政策</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>不保存原始文本</strong>：除非您明确选择保存到历史记录，否则我们不会永久存储您提交的原始文本内容。
            </li>
            <li>
              <strong>加密传输</strong>：所有数据传输均采用TLS/SSL加密，确保数据在传输过程中不被窃取。
            </li>
            <li>
              <strong>匿名分析</strong>：我们可能会使用匿名化的统计数据来改进算法，但这些数据不包含任何可识别个人身份的信息。
            </li>
            <li>
              <strong>本地处理选项</strong>：企业用户可选择部署本地版本，确保敏感数据不离开内部网络。
            </li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">账户安全</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>密码加密存储，采用行业标准的哈希算法</li>
            <li>支持双因素认证(2FA)，提供额外安全保障</li>
            <li>API密钥可随时重置，确保长期安全</li>
            <li>定期安全审计和漏洞扫描</li>
          </ul>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
            <p className="text-green-800">
              如发现任何安全问题或漏洞，请立即联系我们的安全团队：
              <a href="mailto:security@smartpaper.ai" className="text-green-700 underline ml-1">
                security@smartpaper.ai
              </a>
            </p>
          </div>
        </div>
      ),
    },
    code: {
      title: "代码示例",
      content: (
        <div className="space-y-4">
          <p>
            以下是使用不同编程语言调用智鉴真言API的代码示例：
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Python</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
            {`import requests

API_KEY = "your_api_key_here"
API_URL = "https://api.smartpaper.ai/v1/detect"

def detect_ai_text(text, mode="standard"):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "text": text,
        "mode": mode
    }
    
    response = requests.post(API_URL, json=payload, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"API请求失败: {response.status_code}", "details": response.text}

# 使用示例
text_to_analyze = "这是一段需要检测的文本..."
result = detect_ai_text(text_to_analyze)
print(f"AI生成概率: {result['result']['ai_probability']}")
print(f"检测到的可能模型: {result['result']['model_detected']}")`}
          </div>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">JavaScript</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
            {`// 使用fetch API
const API_KEY = 'your_api_key_here';
const API_URL = 'https://api.smartpaper.ai/v1/detect';

async function detectAiText(text, mode = 'standard') {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        mode: mode
      })
    });
    
    if (!response.ok) {
      throw new Error(\`API请求失败: \${response.status}\`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('检测请求出错:', error);
    return { error: error.message };
  }
}

// 使用示例
const textToAnalyze = '这是一段需要检测的文本...';
detectAiText(textToAnalyze)
  .then(result => {
    console.log(\`AI生成概率: \${result.result.ai_probability}\`);
    console.log(\`检测到的可能模型: \${result.result.model_detected}\`);
  })
  .catch(error => {
    console.error('处理失败:', error);
  });`}
          </div>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Java</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
            {`// 使用OkHttp库
import okhttp3.*;
import org.json.*;
import java.io.IOException;

public class SmartPaperApiClient {
    private static final String API_KEY = "your_api_key_here";
    private static final String API_URL = "https://api.smartpaper.ai/v1/detect";
    private final OkHttpClient client = new OkHttpClient();
    
    public JSONObject detectAiText(String text, String mode) throws IOException, JSONException {
        JSONObject requestBody = new JSONObject();
        requestBody.put("text", text);
        requestBody.put("mode", mode);
        
        RequestBody body = RequestBody.create(
            MediaType.parse("application/json"), requestBody.toString());
            
        Request request = new Request.Builder()
            .url(API_URL)
            .addHeader("Authorization", "Bearer " + API_KEY)
            .addHeader("Content-Type", "application/json")
            .post(body)
            .build();
            
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("API请求失败: " + response.code());
            }
            
            String responseData = response.body().string();
            return new JSONObject(responseData);
        }
    }
    
    // 使用示例
    public static void main(String[] args) {
        SmartPaperApiClient client = new SmartPaperApiClient();
        String textToAnalyze = "这是一段需要检测的文本...";
        
        try {
            JSONObject result = client.detectAiText(textToAnalyze, "standard");
            JSONObject detection = result.getJSONObject("result");
            
            System.out.println("AI生成概率: " + detection.getDouble("ai_probability"));
            System.out.println("检测到的可能模型: " + detection.getString("model_detected"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`}
          </div>
        </div>
      ),
    },
    faq: {
      title: "常见问题",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">智鉴真言的检测准确率有多高？</h3>
            <p className="text-gray-600">
              根据我们的测试，智鉴真言在标准模式下的准确率约为92-95%。准确率会受到多种因素影响，
              包括文本长度、语言复杂度、AI模型类型等。对于较短的文本（少于100字），准确率可能会降低。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">系统能检测哪些AI模型生成的内容？</h3>
            <p className="text-gray-600">
              智鉴真言目前可以检测主流大型语言模型生成的内容，包括但不限于GPT-3.5、GPT-4、
              Claude、Llama 2、文心一言等。我们会持续更新算法以适应新出现的AI模型。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">如果AI生成的文本经过人工修改，还能被检测出来吗？</h3>
            <p className="text-gray-600">
              这取决于修改的程度。轻微的人工修改通常不会显著影响检测结果。但如果文本经过大量人工重写
              （超过30-40%的内容），检测准确率可能会降低。在这种情况下，系统通常会给出一个中等概率的结果。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">检测结果显示"低置信度"是什么意思？</h3>
            <p className="text-gray-600">
              "低置信度"表示系统对检测结果的确定性不高。这可能是因为文本样本太短、内容过于简单、
              或者文本同时具有AI和人类创作的特征。在这种情况下，建议提供更长的文本样本或结合其他方法进行判断。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">我可以检测非中文内容吗？</h3>
            <p className="text-gray-600">
              是的，智鉴真言支持多种语言的文本检测，包括英文、中文、日文、韩文和多种欧洲语言。
              不过，对于一些小语种，检测准确率可能略低于主流语言。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">API有使用限制吗？</h3>
            <p className="text-gray-600">
              免费账户每天可以使用100次API调用，单个请求文本长度限制为10,000字符。
              付费账户根据套餐不同有不同的限制，企业用户可联系我们定制专属方案。
            </p>
          </div>
          
          <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="text-lg font-medium mb-2 text-purple-800">还有其他问题？</h3>
            <p className="text-purple-700">
              如果您有其他问题，请随时<a href="mailto:support@smartpaper.ai" className="underline">联系我们的支持团队</a>，
              或查看我们的<a href="#" className="underline">完整文档</a>获取更多信息。
            </p>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container py-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          技术文档
        </motion.h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 侧边导航 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-64 bg-white rounded-xl shadow-sm p-4"
          >
            <nav className="sticky top-24">
              <ul className="space-y-1">
                {docNavItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? "bg-purple-50 text-purple-700"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">需要帮助？</h3>
                <p className="text-sm text-blue-700 mb-3">
                  如果您有任何问题，请随时联系我们的技术支持团队。
                </p>
                <Link
                  to="/experience"
                  className="text-sm flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiCode className="text-lg" />
                  <span>立即体验</span>
                </Link>
              </div>
            </nav>
          </motion.div>
          
          {/* 主要内容 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 bg-white rounded-xl shadow-sm p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold mb-6">{docContent[activeSection].title}</h2>
            <div className="prose prose-blue max-w-none">
              {docContent[activeSection].content}
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
              <Link
                to="/experience"
                className="text-sm flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
              >
                <span>体验检测工具</span>
              </Link>
              <Link
                to="/"
                className="text-sm flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span>返回首页</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;