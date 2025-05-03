import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFileText, FiClock, FiSearch, FiDownload, FiTrash2, FiX, FiExternalLink, FiBarChart2 } from "react-icons/fi";
import { FaRegFileAlt, FaRegFilePdf, FaRegFileWord } from "react-icons/fa";
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
          fileIcon: <FaRegFileAlt />,
          fullContent: "# 人工智能在医疗领域的应用与挑战\n\n## 摘要\n本文探讨了人工智能技术在现代医疗系统中的应用及其面临的挑战。通过分析多个案例研究，我们发现AI在诊断、药物研发和个性化治疗方面展现出巨大潜力，但同时也面临数据隐私、算法透明度和监管等问题。\n\n## 检测结果\n- **AI生成概率**: 87%\n- **检测模型**: GPT-4\n- **特征分析**: 文本呈现出高度一致的语言风格和结构化表达，段落转换流畅，缺乏个人语言特征。",
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
          content: "最新研究报告，全球气候变化的正在加速...",
          date: "2023-06-10 09:15",
          aiScore: 45,
          fileType: "文档",
          fileIcon: <FaRegFileWord />,
          fullContent: "# 全球气候变化的最新进展\n\n据最新研究报告，全球气候变化的正在加速，过去十年是有记录以来最热的十年。研究人员警告，如果不采取紧急行动，全球平均温度可能在本世纪末上升超过2°C，导致严重的环境后果。\n\n## 检测结果\n- **AI生成概率**: 45%\n- **检测模型**: GPT-3.5\n- **特征分析**: 文本呈现出部分人工撰写特征，包含一些不规则表达和个人观点，但也有AI生成内容的特征。",
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
          date: "2023-06-05 10:45",
          aiScore: 92,
          fileType: "PDF",
          fileIcon: <FaRegFilePdf />,
          fullContent: "# 产品说明书\n\n本产品采用最新技术，具有超长续航能力和卓越的性能表现。特别适合专业用户和高要求场景使用。\n\n## 检测结果\n- **AI生成概率**: 92%\n- **检测模型**: GPT-4\n- **特征分析**: 文本高度模板化，缺乏个性表达，用词精准但缺乏人类写作的随机性。",
          detailedAnalysis: {
            languagePatterns: "高度模板化的语言，缺乏个性表达",
            structuralFeatures: "结构严格遵循标准模板",
            semanticCoherence: "内容连贯但过于完美",
            modelSignature: "与GPT-4生成的产品说明文本特征高度匹配"
          }
        },
        {
          id: 4,
          title: "小说片段",
          content: "雨水拍打着窗户，他静静地坐在角落里...",
          date: "2023-05-28 20:10",
          aiScore: 23,
          fileType: "文本",
          fileIcon: <FaRegFileAlt />,
          fullContent: "# 小说片段\n\n雨水拍打着窗户，他静静地坐在角落里，思路如同窗外的雨滴一般纷乱。多年的记忆在此刻交织，那些欢笑与泪水，成功与失败，都在心中激起波澜。\n\n## 检测结果\n- **AI生成概率**: 23%\n- **检测模型**: GPT-3.5\n- **特征分析**: 文本呈现出明显的人类创作特征，包含独特的表达方式和情感流露，结构自然且不规则。",
          detailedAnalysis: {
            languagePatterns: "独特的表达方式，富有个人风格",
            structuralFeatures: "结构自然且不规则，符合人类写作习惯",
            semanticCoherence: "情感流露自然，有深度的思考",
            modelSignature: "几乎没有AI生成内容的特征"
          }
        },
        {
          id: 5,
          title: "技术报告",
          content: "本季度系统性能提升了35%，主要归功于...",
          date: "2023-05-20 11:30",
          aiScore: 76,
          fileType: "文档",
          fileIcon: <FaRegFileWord />,
          fullContent: "# 技术报告\n\n本季度系统性能提升了35%，主要归功于新算法的实施和硬件升级。用户反馈显示满意度提高了28%，特别是在响应速度和稳定性方面。\n\n## 检测结果\n- **AI生成概率**: 76%\n- **检测模型**: GPT-3.5\n- **特征分析**: 文本结构化程度高，数据引用精确，但缺乏技术报告中常见的个人见解和讨论深度。",
          detailedAnalysis: {
            languagePatterns: "专业术语使用准确，但表达过于规范化",
            structuralFeatures: "结构严格遵循技术报告格式",
            semanticCoherence: "内容连贯但缺乏深入讨论",
            modelSignature: "与GPT-3.5生成的技术文档特征较为匹配"
          }
        }
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

  // 获取AI分数对应的颜色和标签
  const getScoreInfo = (score) => {
    if (score >= 70) {
      return { color: 'bg-red-500', label: 'AI生成' };
    } else if (score >= 40) {
      return { color: 'bg-yellow-500', label: '混合内容' };
    } else {
      return { color: 'bg-green-500', label: '人工撰写' };
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* 添加背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-8">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full mb-4">
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">历史记录</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 mb-3">检测历史</h1>
          <p className="text-indigo-700 opacity-80 max-w-xl mx-auto">查看和管理您的AI文本检测历史记录</p>
        </motion.div>
        
        {/* 搜索栏 */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索历史记录..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all shadow-sm bg-white/80 backdrop-blur-sm"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 text-lg" />
          </div>
        </div>
        
        {/* 历史记录列表 */}
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            // 加载状态
            <div className="flex justify-center items-center py-20">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : filteredHistory.length > 0 ? (
            <div className="space-y-5">
              {filteredHistory.map((item) => {
                const scoreInfo = getScoreInfo(item.aiScore);
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md hover:shadow-indigo-100 transition-all p-5 border border-indigo-100"
                  >
                    <div className="flex items-start">
                      {/* 文件类型图标 */}
                      <div className="mr-4 mt-1 p-2.5 bg-indigo-50 rounded-lg text-indigo-500 text-xl">
                        {item.fileIcon}
                      </div>
                      
                      {/* 内容区域 */}
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-indigo-800">{item.title}</h3>
                          
                          {/* AI分数指示器 - 更高级的样式 */}
                          <div className="relative">
                            <div className="flex items-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full px-3 py-1.5 shadow-sm">
                              <div className={`w-2.5 h-2.5 rounded-full ${
                                item.aiScore >= 70 ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
                                item.aiScore >= 40 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 
                                'bg-gradient-to-r from-green-500 to-emerald-500'
                              } mr-2 animate-pulse`}></div>
                              <span className={`text-xs font-semibold ${
                                item.aiScore >= 70 ? 'text-red-600' : 
                                item.aiScore >= 40 ? 'text-amber-600' : 
                                'text-emerald-600'
                              }`}>
                                {item.aiScore}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-indigo-700 text-sm mb-4 line-clamp-2 opacity-80">{item.content}</p>
                        
                        <div className="flex flex-wrap items-center justify-between">
                          <div className="flex items-center text-xs text-indigo-500">
                            <FiClock className="mr-1.5" />
                            <span>{item.date}</span>
                            <span className="mx-2 text-indigo-300">•</span>
                            <span className="flex items-center">{item.fileType}</span>
                          </div>
                          
                          <div className="flex space-x-2 mt-1">
                            <button 
                              onClick={() => handleViewDetail(item)}
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-sm flex items-center gap-1"
                              title="查看详情"
                            >
                              <FiExternalLink />
                              <span className="hidden sm:inline">详情</span>
                            </button>
                            <button 
                              onClick={() => handleDownloadReport(item)}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors text-sm flex items-center gap-1"
                              title="下载报告"
                            >
                              <FiDownload />
                              <span className="hidden sm:inline">下载</span>
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm flex items-center gap-1"
                              title="删除记录"
                            >
                              <FiTrash2 />
                              <span className="hidden sm:inline">删除</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // 无结果
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-indigo-100"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-indigo-50 rounded-full flex items-center justify-center">
                <FiFileText className="text-4xl text-indigo-400" />
              </div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">暂无检测记录</h3>
              <p className="text-indigo-500 max-w-md mx-auto">
                {searchTerm ? "没有找到匹配的检测记录" : "您还没有进行过任何文本检测"}
              </p>
              {!searchTerm && (
                <button className="mt-6 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                  开始检测
                </button>
              )}
            </motion.div>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-900/60 backdrop-blur-sm"
            onClick={closeDetailModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-indigo-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-white rounded-lg text-indigo-500">{selectedItem.fileIcon}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-indigo-800">{selectedItem.title}</h2>
                    <div className="text-xs text-indigo-500 mt-0.5">{selectedItem.date}</div>
                  </div>
                </div>
                <button 
                  onClick={closeDetailModal}
                  className="p-2 rounded-lg hover:bg-white/80 transition-colors"
                >
                  <FiX className="text-indigo-500" />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row h-[calc(90vh-80px)]">
                {/* 左侧内容 */}
                <div className="md:w-2/3 p-6 overflow-y-auto">
                  <div className="prose prose-sm max-w-none prose-headings:text-indigo-700 prose-a:text-purple-600">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {selectedItem.fullContent}
                    </ReactMarkdown>
                  </div>
                </div>
                
                {/* 右侧分析面板 */}
                <div className="md:w-1/3 bg-gradient-to-b from-indigo-50 to-purple-50 p-6 overflow-y-auto border-l border-indigo-100">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-5 flex items-center text-indigo-800">
                      <FiBarChart2 className="mr-2 text-purple-600" />
                      AI检测结果
                    </h3>
                    
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-indigo-700">AI生成概率</span>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedItem.aiScore >= 70 ? 'bg-red-100 text-red-600' : 
                          selectedItem.aiScore >= 40 ? 'bg-amber-100 text-amber-600' : 
                          'bg-emerald-100 text-emerald-600'
                        }`}>
                          {selectedItem.aiScore}%
                        </div>
                      </div>
                      
                      {/* 高级进度条 */}
                      <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedItem.aiScore}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            selectedItem.aiScore >= 70 ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
                            selectedItem.aiScore >= 40 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 
                            'bg-gradient-to-r from-green-500 to-emerald-500'
                          }`}
                        ></motion.div>
                      </div>
                      
                      <div className="mt-2 text-xs flex justify-between text-indigo-600">
                        <span>人工撰写</span>
                        <span>AI生成</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mt-6">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow transition-all"
                      >
                        <h4 className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                          语言模式分析
                        </h4>
                        <p className="text-sm text-indigo-600 opacity-80">{selectedItem.detailedAnalysis?.languagePatterns}</p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow transition-all"
                      >
                        <h4 className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                          结构特征
                        </h4>
                        <p className="text-sm text-indigo-600 opacity-80">{selectedItem.detailedAnalysis?.structuralFeatures}</p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow transition-all"
                      >
                        <h4 className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                          语义连贯性
                        </h4>
                        <p className="text-sm text-indigo-600 opacity-80">{selectedItem.detailedAnalysis?.semanticCoherence}</p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow transition-all"
                      >
                        <h4 className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-violet-400 rounded-full mr-2"></div>
                          模型特征匹配
                        </h4>
                        <p className="text-sm text-indigo-600 opacity-80">{selectedItem.detailedAnalysis?.modelSignature}</p>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      onClick={() => handleDownloadReport(selectedItem)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
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