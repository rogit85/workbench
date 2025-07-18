import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Globe, 
  Heart, 
  Shield, 
  Lightbulb, 
  Users, 
  Award,
  TrendingUp,
  Target,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Building2,
  Calendar,
  MapPin
} from 'lucide-react'

const About = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [storyRef, storyInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [valuesRef, valuesInView] = useInView({ threshold: 0.3, triggerOnce: true })

  const values = [
    {
      title: "Innovation First",
      description: "We embrace cutting-edge technology and creative solutions to solve complex insurance challenges.",
      icon: Lightbulb,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Customer Centricity",
      description: "Every innovation we develop puts our customers' needs and experiences at the center.",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Security & Trust",
      description: "We maintain the highest standards of security and data protection in all our solutions.",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Collaboration",
      description: "We believe the best innovations come from diverse teams working together towards common goals.",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, from code quality to customer service.",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Continuous Learning",
      description: "We foster a culture of continuous learning and adaptation in our fast-evolving industry.",
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ]

  const milestones = [
    {
      year: "1888",
      title: "Sompo Founded",
      description: "Established in Japan as a pioneer in the insurance industry with a vision to protect people and businesses."
    },
    {
      year: "1986",
      title: "UK Operations Begin",
      description: "Sompo expands to the United Kingdom, bringing Japanese insurance excellence to British markets."
    },
    {
      year: "2018",
      title: "Digital Transformation Initiative",
      description: "Launched comprehensive digital transformation program under Brad O'Connor's leadership."
    },
    {
      year: "2022",
      title: "AI Gateway Platform",
      description: "Deployed our proprietary AI Gateway, centralizing all artificial intelligence services."
    },
    {
      year: "2023",
      title: "Innovation Hub Established",
      description: "Created the UK IT Innovation Hub to accelerate AI and technology development."
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Awarded 'Insurance Innovation of the Year' for our AI-powered claims processing system."
    }
  ]

  const achievements = [
    { metric: "£50M+", label: "Investment in Innovation", icon: TrendingUp },
    { metric: "15+", label: "AI Models Deployed", icon: Zap },
    { metric: "1M+", label: "Daily AI Requests", icon: Target },
    { metric: "50+", label: "Innovation Team Members", icon: Users },
    { metric: "40%", label: "Cost Reduction", icon: Award },
    { metric: "95%", label: "Customer Satisfaction", icon: Star }
  ]

  const locations = [
    {
      city: "London",
      type: "Innovation Hub HQ",
      address: "One Bishopsgate, London EC2N 4AX",
      team: 35,
      focus: ["AI Development", "Digital Strategy", "Customer Innovation"]
    },
    {
      city: "Manchester",
      type: "Technology Center",
      address: "Exchange Square, Manchester M3 1BD",
      team: 15,
      focus: ["Data Analytics", "Cloud Infrastructure", "Security"]
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-sompo-red via-purple-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M60 0l60 60-60 60L0 60z\"/%3E%3Cpath d=\"M30 30l30 30-30 30-30-30z\"/%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Globe className="w-16 h-16 mx-auto mb-8 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-yellow-400">Sompo UK</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              For over 135 years, we've been at the forefront of insurance innovation. 
              Today, our UK IT Innovation Hub leads the industry's digital transformation 
              through cutting-edge AI and technology solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={storyRef}
            initial={{ opacity: 0, y: 50 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Innovation Story</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From traditional insurance to AI-powered solutions, discover how we're 
              transforming the industry while staying true to our core mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Pioneering Insurance Innovation
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Since our establishment in Japan in 1888, Sompo has been synonymous with innovation 
                and customer protection. Our journey to the UK began in 1986, bringing decades of 
                insurance expertise to British markets.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Under the visionary leadership of UK CIO Brad O'Connor, we launched our 
                digital transformation initiative in 2018, recognizing that the future of 
                insurance lies in artificial intelligence and automated solutions.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-sompo-red/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-sompo-red" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">135+ Years</div>
                  <div className="text-gray-600">of Insurance Excellence</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h4 className="text-xl font-bold text-gray-900 mb-6">Key Milestones</h4>
              <div className="space-y-6">
                {milestones.slice(0, 4).map((milestone, index) => (
                  <div key={milestone.year} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-sompo-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {milestone.year.slice(-2)}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">{milestone.title}</h5>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Achievement Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {achievements.map((achievement, index) => (
              <div key={achievement.label} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.metric}</div>
                <div className="text-sm text-gray-600">{achievement.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 50 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from developing AI solutions 
              to serving our customers and building our team culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4`}>
                    <value.icon className={`w-8 h-8 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
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
              Our <span className="gradient-text">Locations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategically positioned across the UK to serve our customers 
              and drive innovation from major technology centers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-sompo-red rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{location.city}</h3>
                    <p className="text-lg text-sompo-red font-semibold">{location.type}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-2">{location.address}</p>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{location.team} team members</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Focus Areas:</h4>
                    <div className="space-y-1">
                      {location.focus.map((focus, focusIndex) => (
                        <div key={focusIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600 text-sm">{focus}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
            className="bg-gradient-to-br from-sompo-red to-sompo-red-dark rounded-3xl p-16 text-white shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Shape the Future?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-white">
              Join us in our mission to transform insurance through innovation. 
              Whether you're a customer, partner, or potential team member, 
              we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-sompo-red rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                <span>Contact Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-600">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About 