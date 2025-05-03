import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFileText, FiClock, FiSearch, FiDownload, FiTrash2, FiX, FiExternalLink, FiBarChart2 } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // 模拟从本地存储或API获取历史记录
  useEffect(() => {
    // 这里应该是从API或本地存储获取数据
    // 模拟加载延迟
    const timer = setTimeout(() => {
      const mockHistory = [
        {
          id: 1,
          title: "学术论文检测",
          content: "人工智能在医疗领域的应用与挑战...",
          date: "2023-06-15 14:30",
          aiScore: 87,
          fileType: "文本",
          fullContent: "# 人工智能在医疗领域的应用与挑战\n\n## 摘要\n本文探讨了人工智能技术在现代医疗系统中的应用及其面临的挑战。通过分析多个案例研究，我们发现AI在诊断、药物研发和个性化治疗方面展现出巨大潜力，但同时也面临数据隐私、算法透明度和监管等问题。\n\n## 检测结果\n- **AI生成概率**: 87%\n- **检测模型**: GPT-4\n- **特征分析**: 文本展现出高度一致的语言风格和结构化表达，段落转换流畅，缺乏个人语言特征。",
          detailedAnalysis: {
            languagePatterns: "高度一致的语言风格，缺乏个人写作特征",
            structuralFeatures: "结构过于完美，段落转换非常流畅",
            semanticCoherence: "内容连贯性很高，但缺乏深度思考的痕迹",
            modelSignature: "与GPT-4生成内容的特征高度匹配"
          }
        },
        {
          id: 2,
          title: "新闻稿检测",
          content: "最新研究报告表明，全球气候变化的正在加速...",
          date: "2023-06-10 09:15",
          aiScore: 45,
          fileType: "文档",
          fullContent: "# 全球气候变化的报告最新进展\n\n据最新研究报告表明，全球气候变化的正在加速，过去十年是有记录以来最热的十年。研究人员警告，如果不采取紧急行动，全球平均温度可能在本世纪末上升超过2°C，导致严重的环境后果。\n\n## 检测结果\n- **AI生成概率**: 45%\n- **检测模型**: GPT-3.5\n- **特征分析**: 文本展现出部分人工撰写特征，包含一些不规则表达和个人观点，但也有AI生成内容的特征。",
          detailedAnalysis: {
            languagePatterns: "混合了人工和AI写作风格",
            structuralFeatures: "结构相对自然，有一定的不规则性",
            semanticCoherence: "内容连贯但包含一些独特观点",
            modelSignature: "部分特征与GPT-3.5生成内容匹配"
          }
        },
        {
          id: 3,
          title: "产品说明书",
          content: "本产品采用最新技术，具有超长续航能力...",
          date: "2023-06-05 16:45",
          aiScore: 92,
          fileType: "PDF",
        },
        {
          id: 4,
          title: "小说片段",
          content: "雨水拍打着窗户，他静静地坐在角落里...",
          date: "2023-05-28 20:10",
          aiScore: 23,
          fileType: "文本",
        },
        {
          id: 5,
          title: "技术报告",
          content: "本季度系统性能提升了35%，主要归功于...",
          date: "2023-05-20 11:30",
          aiScore: 76,
          fileType: "文档",
        },
      ];
      setHistoryItems(mockHistory);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 过滤历史记录
  const filteredHistory = historyItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 处理删除历史记录
  const handleDelete = (id) => {
    setHistoryItems(historyItems.filter((item) => item.id !== id));
  };

  // 处理查看详情
  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  // 关闭详情模态框
  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedItem(null);
  };

  // 处理下载报告
  const handleDownloadReport = (item) => {
    // 这里应该实现下载功能
    console.log("下载报告:", item.title);
    
    // 创建一个Blob对象
    const blob = new Blob([item.fullContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // 创建一个临时链接并触发下载
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title}-检测报告.md`;
    document.body.appendChild(a);
    a.click();
    
    // 清理
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
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
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">历史记录</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            检测历史
          </h2>
          <div className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            <p>查看和管理您的AI文本检测历史记录</p>
          </div>
        </motion.div>
        
        {/* 搜索栏 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索历史记录..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* 历史记录列表 */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            // 加载状态
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : filteredHistory.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {filteredHistory.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800 mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.content}</p>
                        <div className="flex items-center text-xs text-gray-400">
                          <FiClock className="mr-1" />
                          <span>{item.date}</span>
                          <span className="mx-2">•</span>
                          <FiFileText className="mr-1" />
                          <span>{item.fileType}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-3 md:mt-0">
                        <div className="mr-4 flex items-center">
                          <div className="w-16 h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                item.aiScore > 70 ? 'bg-red-500' : 
                                item.aiScore > 40 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${item.aiScore}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium">{item.aiScore}%</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewDetail(item)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            title="查看详情"
                          >
                            <FiExternalLink />
                          </button>
                          <button 
                            onClick={() => handleDownloadReport(item)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            title="下载报告"
                          >
                            <FiDownload />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="删除记录"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            // 无结果
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
              <FiFileText className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">暂无检测记录</h3>
              <p className="text-gray-500">
                {searchTerm ? "没有找到匹配的检测记录" : "您还没有进行过任何文本检测"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 详情模态框 */}
      <AnimatePresence>
        {showDetailModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={closeDetailModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">{selectedItem.title}</h2>
                <button 
                  onClick={closeDetailModal}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FiX className="text-gray-500" />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row h-[calc(90vh-80px)]">
                {/* 左侧内容 */}
                <div className="md:w-2/3 p-6 overflow-y-auto">
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {selectedItem.fullContent}
                    </ReactMarkdown>
                  </div>
                </div>
                
                {/* 右侧分析面板 */}
                <div className="md:w-1/3 bg-gray-50 p-6 overflow-y-auto border-l border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <FiBarChart2 className="mr-2 text-purple-600" />
                      AI检测结果
                    </h3>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">AI生成概率</span>
                        <span className="text-sm font-medium">{selectedItem.aiScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            selectedItem.aiScore > 70 ? 'bg-red-500' : 
                            selectedItem.aiScore > 40 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${selectedItem.aiScore}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500 flex justify-between">
                        <span>人工撰写</span>
                        <span>AI生成</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mt-6">
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">语言模式分析</h4>
                        <p className="text-sm text-gray-600">{selectedItem.detailedAnalysis?.languagePatterns}</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">结构特征</h4>
                        <p className="text-sm text-gray-600">{selectedItem.detailedAnalysis?.structuralFeatures}</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">语义连贯性</h4>
                        <p className="text-sm text-gray-600">{selectedItem.detailedAnalysis?.semanticCoherence}</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">模型特征匹配</h4>
                        <p className="text-sm text-gray-600">{selectedItem.detailedAnalysis?.modelSignature}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={() => handleDownloadReport(selectedItem)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <FiDownload />
                      <span>下载完整报告</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;