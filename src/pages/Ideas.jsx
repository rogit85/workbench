import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { 
  Lightbulb, 
  Send, 
  CheckCircle, 
  Star,
  TrendingUp,
  Users,
  Target,
  Rocket,
  Brain,
  Zap,
  ArrowRight
} from 'lucide-react'
import Toast from '../components/Toast'
import useToast from '../hooks/useToast'

const Ideas = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()
  const { toast, showToast, hideToast } = useToast()
  
  const watchedDescription = watch('description', '')
  const descriptionLength = watchedDescription.length

  const onSubmit = (data) => {
    console.log('Idea submitted:', data)
    setIsSubmitted(true)
    showToast('Your idea has been submitted successfully! Our team will review it soon.', 'success', 5000)
    reset()
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const categories = [
    'Customer Experience',
    'Process Automation',
    'Data Analytics',
    'Risk Management',
    'Claims Processing',
    'Fraud Prevention',
    'Mobile Innovation',
    'AI/Machine Learning',
    'Blockchain',
    'IoT Integration',
    'Other'
  ]

  const inspirationAreas = [
    {
      title: "Customer-Centric Solutions",
      description: "Ideas that enhance customer experience and satisfaction",
      icon: Users,
      color: "text-blue-600",
      examples: ["Self-service portals", "Mobile apps", "Personalized experiences"]
    },
    {
      title: "Operational Efficiency",
      description: "Automation and process optimization opportunities",
      icon: Zap,
      color: "text-green-600",
      examples: ["Workflow automation", "AI assistance", "Data integration"]
    },
    {
      title: "Risk Innovation",
      description: "New approaches to risk assessment and management",
      icon: Target,
      color: "text-purple-600",
      examples: ["Predictive modeling", "Real-time monitoring", "IoT sensors"]
    },
    {
      title: "Future Technologies",
      description: "Emerging tech that could transform insurance",
      icon: Rocket,
      color: "text-orange-600",
      examples: ["Blockchain", "AR/VR", "Quantum computing"]
    }
  ]

  const recentIdeas = [
    {
      title: "Voice-Activated Claims",
      submitter: "Sarah Chen",
      category: "Customer Experience",
      status: "Under Review",
      impact: "High"
    },
    {
      title: "Drone Damage Assessment",
      submitter: "Michael Roberts",
      category: "Claims Processing",
      status: "In Development",
      impact: "Medium"
    },
    {
      title: "Blockchain Policy Verification",
      submitter: "Emma Thompson",
      category: "Blockchain",
      status: "Approved",
      impact: "High"
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-sompo-red-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"m0 0h80v80h-80z\"/%3E%3Cpath d=\"m20 20h40v40h-40z\"/%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Lightbulb className="w-16 h-16 mx-auto mb-8 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Share Your <span className="text-yellow-400">Brilliant Ideas</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Innovation happens when great minds collaborate. Submit your ideas and help shape 
              the future of insurance technology at Sompo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Inspiration Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Areas for <span className="gradient-text">Innovation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Looking for inspiration? Here are some key areas where your ideas could make a significant impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {inspirationAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border-t-4 border-transparent hover:border-sompo-red"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <area.icon className={`w-8 h-8 ${area.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{area.title}</h3>
                <p className="text-gray-600 mb-4 text-center">{area.description}</p>
                <div className="space-y-2">
                  {area.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-sompo-red rounded-full"></div>
                      <span className="text-sm text-gray-600">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Submit Your <span className="gradient-text">Idea</span>
            </h2>
            <p className="text-xl text-gray-600">
              Every great innovation starts with a simple idea. Share yours with the team!
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700">
                Your idea has been submitted successfully. Our innovation team will review it and get back to you soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-gray-50 rounded-2xl p-8 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent transition-all duration-200"
                    placeholder="your.email@sompo.co.uk"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    {...register('department')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent transition-all duration-200"
                    placeholder="Your department"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register('category', { required: 'Please select a category' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idea Title *
                </label>
                <input
                  {...register('title', { 
                    required: 'Title is required',
                    minLength: { value: 5, message: 'Title must be at least 5 characters' },
                    maxLength: { value: 100, message: 'Title must be less than 100 characters' }
                  })}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent transition-all duration-200"
                  placeholder="Give your idea a catchy title"
                />
                {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idea Description *
                </label>
                <textarea
                  {...register('description', { 
                    required: 'Description is required',
                    minLength: { value: 50, message: 'Description must be at least 50 characters' },
                    maxLength: { value: 1000, message: 'Description must be less than 1000 characters' }
                  })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent transition-all duration-200"
                  placeholder="Describe your idea in detail. What problem does it solve? How would it work? What benefits would it provide?"
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {descriptionLength}/1000
                </div>
                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Impact
                </label>
                <textarea
                  {...register('impact', {
                    maxLength: { value: 500, message: 'Impact description must be less than 500 characters' }
                  })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sompo-red focus:border-transparent transition-all duration-200"
                  placeholder="What impact do you think this idea could have? (e.g., cost savings, efficiency improvements, customer satisfaction)"
                />
                {errors.impact && <p className="text-red-600 text-sm mt-1">{errors.impact.message}</p>}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-red text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Idea</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </section>

      {/* Recent Ideas */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Recent <span className="gradient-text">Ideas</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See what brilliant ideas your colleagues have submitted recently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentIdeas.map((idea, index) => (
              <motion.div
                key={idea.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold">{idea.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    idea.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    idea.status === 'In Development' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {idea.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">Submitted by {idea.submitter}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">{idea.category}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{idea.impact} Impact</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={hideToast} 
      />
    </div>
  )
}

export default Ideas 