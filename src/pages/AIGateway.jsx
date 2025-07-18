import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Brain, 
  Zap, 
  Shield, 
  Cloud, 
  Database, 
  Cpu, 
  TrendingUp, 
  BarChart3,
  MessageSquare,
  Eye,
  FileText,
  Users,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react'

const AIGateway = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [useCasesRef, useCasesInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [architectureRef, architectureInView] = useInView({ threshold: 0.3, triggerOnce: true })

  const useCases = [
    {
      title: "Claims Processing",
      description: "Automated damage assessment using computer vision and NLP for faster, more accurate claims processing",
      priority: "High",
      impact: "90% faster processing",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      features: ["Image analysis", "Document extraction", "Fraud detection", "Cost estimation"]
    },
    {
      title: "Fraud Detection",
      description: "Real-time pattern recognition and anomaly detection to identify fraudulent activities",
      priority: "Critical",
      impact: "65% reduction in fraud",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-100",
      features: ["Pattern analysis", "Real-time monitoring", "Risk scoring", "Alert generation"]
    },
    {
      title: "Risk Assessment",
      description: "Predictive analytics for accurate risk evaluation and personalized insurance pricing",
      priority: "High",
      impact: "40% more accurate pricing",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
      features: ["Predictive modeling", "Data aggregation", "Risk scoring", "Premium calculation"]
    },
    {
      title: "Customer Service",
      description: "AI-powered chatbots and voice assistants for 24/7 customer support and policy management",
      priority: "Medium",
      impact: "80% faster response",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      features: ["Natural language processing", "Intent recognition", "Multi-channel support", "Escalation handling"]
    },
    {
      title: "Document Intelligence",
      description: "Automatic extraction and processing of information from insurance documents and forms",
      priority: "High",
      impact: "95% accuracy",
      icon: Eye,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      features: ["OCR processing", "Data extraction", "Classification", "Validation"]
    },
    {
      title: "Predictive Analytics",
      description: "Advanced forecasting for market trends, customer behavior, and business optimization",
      priority: "Medium",
      impact: "35% better forecasting",
      icon: BarChart3,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      features: ["Trend analysis", "Behavior prediction", "Market forecasting", "Optimization"]
    }
  ]

  const architectureFeatures = [
    {
      title: "Scalable Infrastructure",
      description: "Cloud-native architecture that scales automatically based on demand",
      icon: Cloud,
      details: ["Auto-scaling", "Load balancing", "Global distribution", "99.9% uptime"]
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade security with full regulatory compliance",
      icon: Shield,
      details: ["End-to-end encryption", "GDPR compliant", "SOC 2 certified", "Regular audits"]
    },
    {
      title: "Model Management",
      description: "Centralized ML model deployment, monitoring, and version control",
      icon: Database,
      details: ["Version control", "A/B testing", "Performance monitoring", "Automated deployment"]
    },
    {
      title: "Real-time Processing",
      description: "High-performance processing for real-time AI inference and decision making",
      icon: Zap,
      details: ["Sub-second response", "Stream processing", "Edge computing", "Parallel execution"]
    }
  ]

  const priorityOrder = [
    { priority: "Critical", count: 1, color: "text-red-600", bgColor: "bg-red-100" },
    { priority: "High", count: 3, color: "text-orange-600", bgColor: "bg-orange-100" },
    { priority: "Medium", count: 2, color: "text-yellow-600", bgColor: "bg-yellow-100" }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sompo-red to-sompo-red-dark">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpolygon points=\"50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40\"/%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
        
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={heroInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Brain className="w-20 h-20 mx-auto mb-8 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Sompo <span className="text-white/90">AI Gateway</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              The central nervous system of our AI-powered insurance platform, 
              enabling seamless integration and deployment of artificial intelligence across all operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <CheckCircle className="w-5 h-5" />
                <span>15+ AI Models</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <CheckCircle className="w-5 h-5" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <CheckCircle className="w-5 h-5" />
                <span>1M+ Daily Requests</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Priority Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Use Cases by <span className="gradient-text">Priority</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Our AI Gateway prioritizes use cases based on business impact, technical feasibility, and strategic importance.
            </p>
            <div className="text-3xl font-bold text-sompo-red mb-12">73 Total Use Cases</div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {priorityOrder.map((item, index) => (
                <motion.div
                  key={item.priority}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${item.bgColor} rounded-2xl p-8 text-center`}
                >
                  <div className={`text-3xl font-bold ${item.color} mb-2`}>{item.count}</div>
                  <div className={`text-lg font-semibold ${item.color} mb-2`}>{item.priority} Priority</div>
                  <div className="text-gray-600">Use Cases</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={useCasesRef}
            initial={{ opacity: 0, y: 50 }}
            animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI <span className="gradient-text">Use Cases</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming insurance operations through intelligent automation and data-driven insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 50 }}
                animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border-l-4 border-transparent hover:border-sompo-red"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-xl ${useCase.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <useCase.icon className={`w-8 h-8 ${useCase.color}`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    useCase.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                    useCase.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {useCase.priority}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{useCase.impact}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-sompo-red rounded-full"></div>
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={architectureRef}
            initial={{ opacity: 0, y: 50 }}
            animate={architectureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Platform <span className="gradient-text">Architecture</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built on modern cloud-native principles for maximum scalability, security, and performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {architectureFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={architectureInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 rounded-xl bg-sompo-red/20">
                    <feature.icon className="w-8 h-8 text-sompo-red" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technical Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={architectureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Real-time Performance Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-sompo-red mb-2">15+</div>
                <div className="text-gray-300">AI Models</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">&lt;100ms</div>
                <div className="text-gray-300">Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">1M+</div>
                <div className="text-gray-300">Daily Requests</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-sompo-red to-sompo-red-dark rounded-3xl p-16 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Build the Future?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
                Join our innovation team and help shape the next generation of AI-powered insurance solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-sompo-red rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 group">
                  <span>Get Technical Documentation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-600">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AIGateway 