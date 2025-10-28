import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Building,
  Shield,
  Save,
  Camera,
  MapPin,
  Calendar,
  Briefcase,
  X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import PageTransition from '../components/PageTransition'

const UserProfile = () => {
  const { user } = useAuth()

  const [profile, setProfile] = useState({
    name: 'Jeremy Isaacs',
    email: 'jeremy.isaacs@sompo.com',
    phone: '+44 20 7123 4567',
    mobile: '+44 7890 123456',
    role: 'Senior Underwriter',
    team: 'Property',
    department: 'Underwriting',
    location: 'London, UK',
    joinDate: '2020-03-15',
    employeeId: 'SI-UW-1234',
    bio: 'Experienced underwriter specializing in Property and Casualty lines with over 10 years in the industry.',
    lobs: ['Property', 'Casualty'],
    specializations: ['High-value Property', 'Complex Risks', 'Commercial Property'],
    languages: ['English', 'Spanish']
  })

  const [isEditing, setIsEditing] = useState(false)
  const [originalProfile, setOriginalProfile] = useState(null)

  const handleEdit = () => {
    setOriginalProfile({...profile})
    setIsEditing(true)
  }

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
    setOriginalProfile(null)
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    setProfile(originalProfile)
    setIsEditing(false)
    setOriginalProfile(null)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold gradient-text">My Profile</h1>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-sompo-red text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-sompo-dark-red transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-6"
          >
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-sompo-red to-sompo-dark-red"></div>

            {/* Profile Info */}
            <div className="px-8 pb-8">
              <div className="flex items-start -mt-16 mb-6">
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center text-4xl font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-sompo-red text-white rounded-full flex items-center justify-center hover:bg-sompo-dark-red">
                      <Camera className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="ml-6 mt-20">
                  <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-gray-600">{profile.role}</p>
                  <p className="text-sm text-gray-500">{profile.team} Team • {profile.department}</p>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                  />
                ) : (
                  <p className="text-gray-600">{profile.bio}</p>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        {isEditing ? (
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                            className="text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1"
                          />
                        ) : (
                          <p className="text-sm font-medium text-gray-900">{profile.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Office Phone</p>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            className="text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1"
                          />
                        ) : (
                          <p className="text-sm font-medium text-gray-900">{profile.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Mobile</p>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profile.mobile}
                            onChange={(e) => setProfile({...profile, mobile: e.target.value})}
                            className="text-sm font-medium text-gray-900 border border-gray-300 rounded px-2 py-1"
                          />
                        ) : (
                          <p className="text-sm font-medium text-gray-900">{profile.mobile}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-900">{profile.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Work Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Employee ID</p>
                        <p className="text-sm font-medium text-gray-900">{profile.employeeId}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Join Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(profile.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Team</p>
                        <p className="text-sm font-medium text-gray-900">{profile.team}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Role</p>
                        <p className="text-sm font-medium text-gray-900">{profile.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lines of Business */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Lines of Business</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.lobs.map((lob) => (
                    <span key={lob} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {lob}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((spec) => (
                    <span key={spec} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

export default UserProfile
