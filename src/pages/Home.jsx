import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { 
  Brain, 
  Zap, 
  Shield, 
  Cpu, 
  TrendingUp, 
  Users, 
  ArrowRight,
  Sparkles,
  Database,
  Cloud
} from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'

const Home = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true })

  const currentProjects = [
    {
      title: "Claims Processing AI",
      description: "Automated claims assessment using computer vision and natural language processing",
      status: "In Development",
      progress: 75,
      icon: Brain,
      color: "text-blue-600"
    },
    {
      title: "Fraud Detection System",
      description: "Machine learning algorithms to identify suspicious patterns in real-time",
      status: "Testing Phase",
      progress: 90,
      icon: Shield,
      color: "text-green-600"
    },
    {
      title: "Customer Risk Assessment",
      description: "Predictive analytics for personalized insurance pricing and risk evaluation",
      status: "Planning",
      progress: 30,
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Voice Assistant Integration",
      description: "AI-powered voice interface for policy management and customer support",
      status: "Research",
      progress: 15,
      icon: Cpu,
      color: "text-orange-600"
    }
  ]

  const stats = [
    { label: "AI Models Deployed", value: "12+", icon: Brain },
    { label: "Processing Speed Increase", value: "300%", icon: Zap },
    { label: "Customer Satisfaction", value: "95%", icon: Users },
    { label: "Cost Reduction", value: "40%", icon: TrendingUp }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-sompo-red-dark"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
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
            className="mb-8"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-sompo-red animate-pulse" />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.span 
                className="gradient-text"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Innovating
              </motion.span> the Future
              <br />
              of Insurance
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Welcome to Sompo's UK IT Innovation Hub, where cutting-edge AI technology 
              meets insurance expertise to revolutionize customer experiences and operational efficiency.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              to="/ai-gateway"
              className="px-8 py-4 bg-gradient-red text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2 group"
            >
              <span>Explore AI Gateway</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 bg-gray-800/80 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-gray-700/80 transition-all duration-300 border border-gray-600"
            >
              View Current Projects
            </Link>
          </motion.div>

          {/* Floating elements */}
          <motion.div 
            className="absolute top-20 left-10"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-20 h-20 bg-sompo-red/20 rounded-full blur-xl"></div>
          </motion.div>
          <motion.div 
            className="absolute bottom-20 right-10"
            animate={{ 
              y: [0, 20, 0],
              x: [0, -15, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <div className="w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
          </motion.div>
          <motion.div 
            className="absolute top-1/3 right-20"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-16 h-16 bg-purple-500/20 rounded-full blur-lg"></div>
          </motion.div>
          <motion.div 
            className="absolute bottom-1/3 left-20"
            animate={{ 
              y: [0, 25, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-full blur-xl"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Driving <span className="gradient-text">Real Impact</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI innovations are transforming how Sompo operates, delivering measurable results across all business areas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-700 hover:border-sompo-red transition-all duration-300 group"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-sompo-red group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold mb-2 text-white">
                  {stat.value.includes('+') ? (
                    <>
                      <AnimatedCounter to={parseInt(stat.value)} duration={2.5} />+
                    </>
                  ) : stat.value.includes('%') ? (
                    <>
                      <AnimatedCounter to={parseInt(stat.value)} duration={2.5} suffix="%" />
                    </>
                  ) : (
                    stat.value
                  )}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Projects */}
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
              Current <span className="gradient-text">Innovation</span> Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the cutting-edge projects our team is working on to transform 
              the insurance industry through artificial intelligence and automation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={projectsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gray-100 group-hover:scale-110 transition-transform duration-300`}>
                    <project.icon className={`w-8 h-8 ${project.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'In Development' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'Testing Phase' ? 'bg-green-100 text-green-800' :
                        project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={projectsInView ? { width: `${project.progress}%` } : {}}
                          transition={{ duration: 1.5, delay: index * 0.3, ease: "easeOut" }}
                          className="h-3 bg-gradient-to-r from-sompo-red to-sompo-red-light rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-red text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI Gateway Preview */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sompo-red/20 to-blue-600/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Powered by <span className="gradient-text">AI Gateway</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Our proprietary AI Gateway platform centralizes all artificial intelligence 
                services, enabling seamless integration across applications and providing 
                unparalleled scalability for our innovation initiatives.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Cloud className="w-6 h-6 text-sompo-red" />
                  <span>Cloud-native architecture for maximum scalability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Database className="w-6 h-6 text-sompo-red" />
                  <span>Centralized AI model management and deployment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-sompo-red" />
                  <span>Enterprise-grade security and compliance</span>
                </div>
              </div>
              <Link
                to="/ai-gateway"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-400 ml-4">ai-gateway.sompo.co.uk</span>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="text-green-400">$ sompo-ai status</div>
                  <div className="text-gray-300">✓ Claims AI: Online (99.9% uptime)</div>
                  <div className="text-gray-300">✓ Fraud Detection: Processing 1.2M requests/day</div>
                  <div className="text-gray-300">✓ Risk Assessment: 15 models deployed</div>
                  <div className="text-blue-400 animate-pulse">⚡ Real-time processing active</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-sompo-red/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </motion.div>
          </div>
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
                Ready to Innovate with Us?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
                Join our mission to transform insurance through technology. 
                Share your ideas and be part of the innovation journey.
              </p>
              <Link
                to="/ideas"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-sompo-red rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <span>Submit Your Ideas</span>
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home 