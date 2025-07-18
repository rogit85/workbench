import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Brain, 
  Shield, 
  TrendingUp, 
  Cpu, 
  Eye,
  MessageSquare,
  Database,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Calendar,
  Target,
  Zap,
  FileText
} from 'lucide-react'

const Projects = () => {
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [roadmapRef, roadmapInView] = useInView({ threshold: 0.3, triggerOnce: true })

  const projects = [
    {
      title: "Claims Processing AI",
      description: "Advanced computer vision and NLP system for automated damage assessment and claims processing",
      status: "In Development",
      progress: 75,
      team: 8,
      startDate: "2024-01-15",
      expectedCompletion: "2024-06-30",
      priority: "High",
      icon: Brain,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      technologies: ["Computer Vision", "NLP", "Azure AI", "Python"],
      milestones: [
        { name: "Requirements Analysis", completed: true },
        { name: "Prototype Development", completed: true },
        { name: "Model Training", completed: true },
        { name: "Integration Testing", completed: false },
        { name: "Production Deployment", completed: false }
      ],
      benefits: [
        "90% faster claim processing",
        "Reduced manual review time",
        "Improved accuracy and consistency",
        "Enhanced customer satisfaction"
      ]
    },
    {
      title: "Fraud Detection System",
      description: "Real-time machine learning platform for identifying suspicious patterns and fraudulent activities",
      status: "Testing Phase",
      progress: 90,
      team: 6,
      startDate: "2023-09-01",
      expectedCompletion: "2024-03-31",
      priority: "Critical",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
      technologies: ["ML Algorithms", "Real-time Analytics", "Apache Kafka", "TensorFlow"],
      milestones: [
        { name: "Data Collection", completed: true },
        { name: "Model Development", completed: true },
        { name: "System Integration", completed: true },
        { name: "User Acceptance Testing", completed: true },
        { name: "Production Rollout", completed: false }
      ],
      benefits: [
        "65% reduction in fraud cases",
        "Real-time threat detection",
        "Automated alert system",
        "Significant cost savings"
      ]
    },
    {
      title: "Customer Risk Assessment",
      description: "Predictive analytics platform for personalized insurance pricing and comprehensive risk evaluation",
      status: "Planning",
      progress: 30,
      team: 5,
      startDate: "2024-02-01",
      expectedCompletion: "2024-09-30",
      priority: "High",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      technologies: ["Predictive Modeling", "Big Data", "Spark", "R"],
      milestones: [
        { name: "Market Research", completed: true },
        { name: "Technical Architecture", completed: true },
        { name: "Data Pipeline Setup", completed: false },
        { name: "Model Development", completed: false },
        { name: "Integration & Testing", completed: false }
      ],
      benefits: [
        "40% more accurate pricing",
        "Personalized risk profiles",
        "Competitive advantage",
        "Improved profitability"
      ]
    },
    {
      title: "Voice Assistant Integration",
      description: "AI-powered conversational interface for policy management and customer support automation",
      status: "Research",
      progress: 15,
      team: 4,
      startDate: "2024-03-01",
      expectedCompletion: "2024-12-31",
      priority: "Medium",
      icon: Cpu,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      technologies: ["Voice Recognition", "NLU", "Conversational AI", "Azure Speech"],
      milestones: [
        { name: "Technology Evaluation", completed: true },
        { name: "Proof of Concept", completed: false },
        { name: "Voice Model Training", completed: false },
        { name: "System Integration", completed: false },
        { name: "Pilot Launch", completed: false }
      ],
      benefits: [
        "24/7 customer support",
        "80% faster response times",
        "Reduced call center load",
        "Enhanced user experience"
      ]
    },
    {
      title: "Document Intelligence Platform",
      description: "Automated document processing and information extraction using advanced OCR and AI technologies",
      status: "In Development",
      progress: 60,
      team: 6,
      startDate: "2023-11-01",
      expectedCompletion: "2024-05-31",
      priority: "High",
      icon: FileText,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      technologies: ["OCR", "Document AI", "Form Recognizer", "Azure Cognitive Services"],
      milestones: [
        { name: "Document Analysis", completed: true },
        { name: "OCR Model Training", completed: true },
        { name: "API Development", completed: true },
        { name: "Quality Assurance", completed: false },
        { name: "Production Deployment", completed: false }
      ],
      benefits: [
        "95% accuracy in data extraction",
        "Manual processing reduction",
        "Faster turnaround times",
        "Improved data quality"
      ]
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Comprehensive business intelligence platform for real-time monitoring and data-driven decision making",
      status: "Testing Phase",
      progress: 85,
      team: 7,
      startDate: "2023-10-01",
      expectedCompletion: "2024-04-15",
      priority: "Medium",
      icon: Eye,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
      technologies: ["Power BI", "Real-time Streaming", "Azure Analytics", "SQL"],
      milestones: [
        { name: "Requirements Gathering", completed: true },
        { name: "Dashboard Design", completed: true },
        { name: "Data Integration", completed: true },
        { name: "Performance Testing", completed: true },
        { name: "User Training", completed: false }
      ],
      benefits: [
        "Real-time business insights",
        "Data-driven decisions",
        "Operational visibility",
        "Performance monitoring"
      ]
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Development': return 'bg-blue-100 text-blue-800'
      case 'Testing Phase': return 'bg-green-100 text-green-800'
      case 'Planning': return 'bg-yellow-100 text-yellow-800'
      case 'Research': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const roadmapItems = [
    { quarter: "Q1 2024", title: "Fraud Detection Launch", status: "completed" },
    { quarter: "Q2 2024", title: "Claims AI Deployment", status: "in-progress" },
    { quarter: "Q3 2024", title: "Risk Assessment Platform", status: "planned" },
    { quarter: "Q4 2024", title: "Voice Assistant Pilot", status: "planned" }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-sompo-red-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 0l30 30-30 30L0 30z\"/%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Target className="w-16 h-16 mx-auto mb-8 text-sompo-red animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Innovation <span className="text-sompo-red">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Discover the cutting-edge projects transforming insurance through AI, automation, 
              and innovative technology solutions at Sompo UK.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Overview Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-sompo-red to-sompo-red-dark rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl font-bold mb-2 text-white">6</div>
              <div className="text-sm text-white">Active Projects</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-blue-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl font-bold mb-2 text-white">5</div>
              <div className="text-sm text-white">Core Team Members</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-green-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl font-bold mb-2 text-white">2</div>
              <div className="text-sm text-white">Ready for Launch</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-purple-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl font-bold mb-2 text-white">£2.5M</div>
              <div className="text-sm text-white">Expected Savings</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={projectsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Current <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our active innovation projects and track their progress towards transforming insurance operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${project.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <project.icon className={`w-8 h-8 ${project.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{project.description}</p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                  </div>
                                       <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                       <motion.div
                         initial={{ width: 0 }}
                         animate={projectsInView ? { width: `${project.progress}%` } : {}}
                         transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                         className="h-4 bg-gradient-to-r from-sompo-red to-sompo-red-light rounded-full relative"
                       >
                         <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                         <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white">
                           {project.progress}%
                         </div>
                       </motion.div>
                     </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{project.team} team members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Due: {new Date(project.expectedCompletion).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Milestones:</h4>
                  <div className="space-y-2">
                    {project.milestones.map((milestone, milestoneIndex) => (
                      <div key={milestoneIndex} className="flex items-center space-x-2">
                        {milestone.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={`text-sm ${milestone.completed ? 'text-gray-700' : 'text-gray-500'}`}>
                          {milestone.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Expected Benefits:</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {project.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-sompo-red rounded-full"></div>
                        <span className="text-xs text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={roadmapRef}
            initial={{ opacity: 0, y: 50 }}
            animate={roadmapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Innovation <span className="gradient-text">Roadmap</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our strategic timeline for delivering game-changing AI solutions throughout 2024.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-sompo-red"></div>
            <div className="space-y-12">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={item.quarter}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={roadmapInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-sm text-sompo-red font-semibold mb-2">{item.quarter}</div>
                      <div className="text-lg font-bold mb-2">{item.title}</div>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status === 'completed' ? 'Completed' :
                         item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sompo-red rounded-full border-4 border-gray-900"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects 