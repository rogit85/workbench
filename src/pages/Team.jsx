import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Users, 
  Award, 
  Linkedin, 
  Mail, 
  MapPin,
  Star,
  Brain,
  Code,
  Database,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Globe
} from 'lucide-react'

const Team = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [leadershipRef, leadershipInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [teamRef, teamInView] = useInView({ threshold: 0.3, triggerOnce: true })

  const leadership = [
    {
      name: "Brad O'Connor",
      role: "UK Chief Information Officer",
      bio: "A global technology and change leader with deep expertise and a strong track record in delivering business transformation. This has ranged from implementing agile ways of working & a product management mindset, implementing Target Operating Models (TOMs), creating new business units, entering new territories and markets, integrations, outsourcing, process automation, leveraging data to enable smarter underwriting and regulatory initiatives. A natural leader with the ability to create high performing teams, build stakeholder partnerships, lead multi-disciplinary functions, and manage multi-million-pound budgets. Combines business acumen and delivery skills to transform strategy into meaningful business outcomes.",
      image: "/api/placeholder/300/300",
      location: "London, UK",
      experience: [
        {
          company: "Sompo",
          role: "UK Chief Information Officer",
          period: "Nov 2024 - Present",
          duration: "9 mos"
        },
        {
          company: "Miller Insurance Services LLP",
          role: "Chief Information Officer",
          period: "Oct 2022 - Nov 2024",
          duration: "2 yrs 2 mos"
        },
        {
          company: "Beazley",
          role: "Head of Technology",
          period: "Jan 2018 - Sep 2022",
          duration: "4 yrs 9 mos",
          description: "Reporting to the Group CIO, accountable for the UK and Rest of World and Claims Technology strategy and product roadmaps."
        }
      ],
      achievements: [
        "Led digital transformation initiatives across multiple insurance companies",
        "Implemented Target Operating Models and agile ways of working",
        "Created new business units and entered new territories",
        "Built world-class innovation teams and stakeholder partnerships"
      ],
      expertise: ["Digital Transformation", "Business Transformation", "Target Operating Models", "Team Leadership", "Agile Methodologies", "Product Management"],
      social: {
        linkedin: "brad-oconnor-cio",
        email: "brad.oconnor@sompo.co.uk"
      }
    }
  ]

  const teamMembers = [
    {
      name: "Mike Constantin",
      role: "Solutions Architect and AI Specialist",
      department: "Artificial Intelligence",
      expertise: ["AI Solution Architecture", "Machine Learning Implementation", "System Design", "Insurance Technology"],
      projects: ["AI Gateway Platform", "Claims Processing AI"],
      bio: "Experienced in implementing and building AI solutions across Sompo and Miller Insurance, focusing on scalable architectures and practical AI applications.",
      image: "/api/placeholder/200/200",
      icon: Brain,
      color: "text-blue-600"
    },
    {
      name: "Chris Rogers",
      role: "AI Specialist and AI Developer",
      department: "Artificial Intelligence",
      expertise: ["AI Development", "Machine Learning", "Python", "Model Deployment", "Government Solutions"],
      projects: ["AI Model Development", "Government AI Solutions"],
      bio: "Designed and built AI solutions across Sompo, UK government projects, and various other companies with expertise in end-to-end AI development.",
      image: "/api/placeholder/200/200",
      icon: Code,
      color: "text-green-600"
    },
    {
      name: "Miguel Palacios",
      role: "Data Scientist and AI Specialist Developer",
      department: "Analytics",
      expertise: ["Data Science", "AI Development", "Statistical Modeling", "Predictive Analytics", "Insurance Analytics"],
      projects: ["Risk Assessment Platform", "Predictive Models"],
      bio: "Built various AI and data science solutions at Miller Insurance and other organizations, specializing in insurance-specific analytics and modeling.",
      image: "/api/placeholder/200/200",
      icon: Database,
      color: "text-purple-600"
    },
    {
      name: "Elliot Charing",
      role: "Business Analyst",
      department: "Strategy",
      expertise: ["Business Analysis", "Requirements Gathering", "Process Design", "System Integration", "Insurance Operations"],
      projects: ["Business Process Optimization", "System Requirements"],
      bio: "Experienced business analyst with extensive background across insurance companies including Sompo, with expertise in CRM, policy management, and claims systems.",
      experience: [
        {
          company: "Sompo",
          role: "Business Analyst",
          period: "Jun 2025 - Present",
          type: "Contract"
        },
        {
          company: "Convex Insurance",
          role: "Business Analyst", 
          period: "Oct 2023 - Oct 2024",
          type: "Contract"
        },
        {
          company: "MIC Global",
          role: "Business Analyst",
          period: "Mar 2022 - Oct 2023"
        }
      ],
      image: "/api/placeholder/200/200",
      icon: TrendingUp,
      color: "text-indigo-600"
    }
  ]



  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-sompo-red-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M50 10a40 40 0 1 0 0 80 40 40 0 1 0 0-80zm0 10a30 30 0 1 1 0 60 30 30 0 1 1 0-60z\"/%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Users className="w-16 h-16 mx-auto mb-8 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Meet Our <span className="text-yellow-400">Innovation Team</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              The brilliant minds behind Sompo's digital transformation, working together to 
              revolutionize insurance through cutting-edge AI and technology solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={leadershipRef}
            initial={{ opacity: 0, y: 50 }}
            animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Leadership <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visionary leadership driving innovation and digital transformation across Sompo UK.
            </p>
          </motion.div>

          {leadership.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 50 }}
              animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-12 shadow-xl border border-gray-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-1">
                  <div className="relative">
                    <div className="w-80 h-80 mx-auto bg-gradient-red rounded-full p-2">
                      <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-32 h-32 text-gray-400" />
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-sompo-red text-white p-4 rounded-full">
                      <Award className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                    <p className="text-xl text-sompo-red font-semibold mb-4">{leader.role}</p>
                    <div className="flex items-center space-x-2 text-gray-600 mb-6">
                      <MapPin className="w-5 h-5" />
                      <span>{leader.location}</span>
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-8">{leader.bio}</p>

                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                       <h4 className="text-lg font-bold text-gray-900 mb-4">Professional Experience</h4>
                       <div className="space-y-4">
                         {leader.experience.map((exp, expIndex) => (
                           <div key={expIndex} className="border-l-2 border-sompo-red pl-4">
                             <h5 className="font-semibold text-gray-900">{exp.role}</h5>
                             <p className="text-sompo-red font-medium">{exp.company}</p>
                             <p className="text-sm text-gray-600">{exp.period} • {exp.duration}</p>
                             {exp.description && (
                               <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                             )}
                           </div>
                         ))}
                       </div>
                       
                       <h4 className="text-lg font-bold text-gray-900 mb-4 mt-8">Key Achievements</h4>
                       <ul className="space-y-3">
                         {leader.achievements.map((achievement, achievementIndex) => (
                           <li key={achievementIndex} className="flex items-start space-x-3">
                             <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                             <span className="text-gray-700">{achievement}</span>
                           </li>
                         ))}
                       </ul>
                     </div>

                     <div>
                       <h4 className="text-lg font-bold text-gray-900 mb-4">Areas of Expertise</h4>
                       <div className="flex flex-wrap gap-2 mb-6">
                         {leader.expertise.map((skill, skillIndex) => (
                           <span
                             key={skillIndex}
                             className="px-3 py-1 bg-sompo-red/10 text-sompo-red rounded-full text-sm font-medium"
                           >
                             {skill}
                           </span>
                         ))}
                       </div>

                       <div className="flex space-x-4">
                         <a
                           href={`mailto:${leader.social.email}`}
                           className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                         >
                           <Mail className="w-4 h-4" />
                           <span className="text-sm">Email</span>
                         </a>
                         <a
                           href={`https://linkedin.com/in/${leader.social.linkedin}`}
                           className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                         >
                           <Linkedin className="w-4 h-4" />
                           <span className="text-sm">LinkedIn</span>
                         </a>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Process */}
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
              Our <span className="gradient-text">Innovation Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fast iteration and MVP development to rapidly transform ideas into reality
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-sompo-red/20 via-sompo-red to-sompo-red/20"></div>
              
              {/* Phase 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-lg">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Design Workshop</h3>
                  <p className="text-gray-600 text-center">
                    We hold collaborative design workshops to understand requirements and create innovative solutions
                  </p>
                </div>
              </motion.div>

              {/* Phase 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-lg">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Build MVP</h3>
                  <p className="text-gray-600 text-center">
                    Rapid development of minimum viable product using agile methodologies and latest technologies
                  </p>
                </div>
              </motion.div>

              {/* Phase 3 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-lg">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Early Feedback</h3>
                  <p className="text-gray-600 text-center">
                    Launch to early users, gather feedback, and validate assumptions with real-world data
                  </p>
                </div>
              </motion.div>

              {/* Phase 4 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-lg">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Iterate & Scale</h3>
                  <p className="text-gray-600 text-center">
                    Continuous improvement based on feedback, scaling successful features across the organization
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-16 bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Our Process Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center bg-white rounded-xl p-6 shadow-md">
                  <div className="w-16 h-16 mx-auto mb-4 bg-sompo-red/10 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-sompo-red" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Speed to Market</h4>
                  <p className="text-gray-600 text-sm">Launch MVPs in weeks, not months</p>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-md">
                  <div className="w-16 h-16 mx-auto mb-4 bg-sompo-red/10 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-sompo-red" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">User-Centric</h4>
                  <p className="text-gray-600 text-sm">Real feedback drives our iterations</p>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-md">
                  <div className="w-16 h-16 mx-auto mb-4 bg-sompo-red/10 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-sompo-red" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Risk Reduction</h4>
                  <p className="text-gray-600 text-sm">Validate ideas before major investment</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={teamRef}
            initial={{ opacity: 0, y: 50 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Innovation <span className="gradient-text">Champions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the talented professionals who make our AI-driven transformation possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                <div className="text-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <member.icon className={`w-12 h-12 ${member.color}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-sompo-red font-semibold mb-2">{member.role}</p>
                  <p className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full inline-block">
                    {member.department}
                  </p>
                </div>

                                 {member.bio && (
                   <div className="mb-4">
                     <p className="text-xs text-gray-600 leading-relaxed">{member.bio}</p>
                   </div>
                 )}

                 <div className="mb-4">
                   <h4 className="text-sm font-semibold text-gray-700 mb-2">Expertise:</h4>
                   <div className="flex flex-wrap gap-1">
                     {member.expertise.map((skill, skillIndex) => (
                       <span
                         key={skillIndex}
                         className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                       >
                         {skill}
                       </span>
                     ))}
                   </div>
                 </div>

                 {member.experience && (
                   <div className="mb-4">
                     <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Experience:</h4>
                     <div className="space-y-2">
                       {member.experience.slice(0, 2).map((exp, expIndex) => (
                         <div key={expIndex} className="text-xs">
                           <p className="font-medium text-gray-700">{exp.company}</p>
                           <p className="text-gray-600">{exp.role} • {exp.period}</p>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                 <div>
                   <h4 className="text-sm font-semibold text-gray-700 mb-2">Current Projects:</h4>
                   <div className="space-y-1">
                     {member.projects.map((project, projectIndex) => (
                       <div key={projectIndex} className="flex items-center space-x-2">
                         <div className="w-1.5 h-1.5 bg-sompo-red rounded-full"></div>
                         <span className="text-xs text-gray-600">{project}</span>
                       </div>
                     ))}
                   </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team CTA */}
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
              Want to Join Our Team?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-white">
              We're always looking for talented individuals who share our passion for innovation 
              and transforming the insurance industry through technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-sompo-red rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                View Open Positions
              </button>
              <button className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-600">
                Learn About Our Culture
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Team 