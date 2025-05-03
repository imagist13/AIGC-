import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { processTextDetectionStream } from "../services/api.js";
import { FiFileText, FiArrowRight, FiLoader, FiUpload } from "react-icons/fi";
import { FaPen } from "react-icons/fa";

const Experience = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [promptName, setPromptName] = useState('standard');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputUrl.trim() && !uploadedFile) return;
    
    setIsLoading(true);
    setResponseContent('');
    setProgress(0);
    setAnalysisComplete(false);
    
    // 模拟进度条
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    try {
      // 这里使用文本或文件内容调用API
      const textToAnalyze = uploadedFile ? await uploadedFile.text() : inputUrl;
      const stream = await processTextDetectionStream(textToAnalyze, promptName);
      
      while (true) {
        const { done, content } = await stream.read();
        if (done) break;
        setResponseContent(prev => prev + content);
      }
      
      setProgress(100);
      setAnalysisComplete(true);
    } catch (error) {
      console.error('流式输出失败:', error);
      setResponseContent('检测失败，请重试');
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setInputUrl(''); // 清空文本输入
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="pt-16 min-h-screen overflow-hidden bg-gray-50 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 opacity-70"></div>
      
      <div className="container relative z-10 py-10">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full mb-4">
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">AI文本检测</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            智能检测工具
          </h2>
          <div className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            <p>输入文本或上传文件，快速获取AI生成概率分析</p>
            <p className="text-sm text-gray-500 mt-2">支持多种AI模型检测，准确率高达95%</p>
          </div>
        </motion.div>
        
        {/* 检测工具主体内容 */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
              <FaPen className="text-purple-600 text-xl mr-2" />
              智鉴真言
            </h3>
            <p className="text-gray-600 text-sm">让知识汇聚，一触即达。</p>
          </div>
          
          <div className="mb-6">
            <textarea 
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
                setUploadedFile(null); // 清空已上传文件
              }}
              placeholder="在此输入你的研究主题..."
              className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300 min-h-[120px] text-gray-700 resize-none"
              disabled={isLoading}
            ></textarea>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button 
              onClick={triggerFileInput}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              disabled={isLoading}
            >
              <FiUpload className="text-gray-600" />
              <span className="text-gray-700">上传文件</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".txt,.pdf,.doc,.docx"
            />
            
            {uploadedFile && (
              <div className="flex-1 flex items-center px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg text-purple-700">
                <FiFileText className="mr-2" />
                <span className="truncate">{uploadedFile.name}</span>
              </div>
            )}
            
            <motion.button 
              onClick={handleSubmit}
              className="flex-1 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-600 transition-colors duration-200 flex items-center justify-center"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  <span>分析中...</span>
                </>
              ) : (
                <>
                  <span>开始分析</span>
                  <FiArrowRight className="ml-2" />
                </>
              )}
            </motion.button>
          </div>
          
          {/* 进度条样式 */}
          {isLoading && (
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">
                {progress < 100 ? "正在生成文本分析结果..." : "分析完成!"}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* 分析结果 */}
          {responseContent && (
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">文本分析结果</h2>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">文件名</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作者</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">研究领域</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">得分</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">研究方法</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {uploadedFile ? uploadedFile.name : "输入文本"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">AI分析中</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">AI分析中</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">AI分析中</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">AI分析中</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 prose prose-sm max-w-none bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {responseContent}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;