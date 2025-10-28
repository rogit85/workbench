import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Save,
  Plus,
  Edit,
  Trash2,
  Eye,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'More Information Required',
      subject: 'Additional Information Needed - {{submissionRef}}',
      category: 'Submission Request',
      lastModified: '2024-10-25',
      content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="text-align: center; padding: 20px; background-color: #CC0000;">
    <img src="/sompo-logo-white.svg" alt="Sompo" style="height: 60px;" />
  </div>
  <div style="padding: 30px; background-color: #ffffff;">
    <p>Dear {{brokerName}},</p>

    <p>Thank you for your submission <strong>{{submissionRef}}</strong> for <strong>{{insuredName}}</strong>.</p>

    <p>To continue processing your submission, we require the following additional information:</p>

    <ul>
      <li>{{requiredItem1}}</li>
      <li>{{requiredItem2}}</li>
      <li>{{requiredItem3}}</li>
    </ul>

    <p>Please provide the requested information at your earliest convenience. If you have any questions, please don't hesitate to contact us.</p>

    <p>Best regards,<br/>
    <strong>{{underwriterName}}</strong><br/>
    Sompo International<br/>
    {{underwriterEmail}}</p>
  </div>
  <div style="padding: 20px; background-color: #f5f5f5; text-align: center; font-size: 12px; color: #666;">
    <p>Sompo International | Global Underwriting Excellence</p>
  </div>
</div>`
    },
    {
      id: 2,
      name: 'Automatic Response',
      subject: 'Submission Received - {{submissionRef}}',
      category: 'Submission Acknowledgment',
      lastModified: '2024-10-24',
      content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="text-align: center; padding: 20px; background-color: #CC0000;">
    <img src="/sompo-logo-white.svg" alt="Sompo" style="height: 60px;" />
  </div>
  <div style="padding: 30px; background-color: #ffffff;">
    <p>Dear {{brokerName}},</p>

    <p>This is to confirm that we have received your submission <strong>{{submissionRef}}</strong> for <strong>{{insuredName}}</strong>.</p>

    <h3 style="color: #CC0000;">Submission Details:</h3>
    <ul>
      <li><strong>Line of Business:</strong> {{lob}}</li>
      <li><strong>GWP:</strong> {{gwp}}</li>
      <li><strong>Inception Date:</strong> {{inceptionDate}}</li>
    </ul>

    <p>Our underwriting team will review your submission and respond within <strong>{{slaTime}}</strong> business days.</p>

    <p>You can track the status of your submission through our portal or contact us directly if you have any questions.</p>

    <p>Thank you for choosing Sompo International.</p>

    <p>Best regards,<br/>
    <strong>Sompo International Underwriting Team</strong></p>
  </div>
  <div style="padding: 20px; background-color: #f5f5f5; text-align: center; font-size: 12px; color: #666;">
    <p>Sompo International | Global Underwriting Excellence</p>
  </div>
</div>`
    },
    {
      id: 3,
      name: 'Submission Declined to Quote',
      subject: 'Submission Decision - {{submissionRef}}',
      category: 'Submission Decision',
      lastModified: '2024-10-23',
      content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="text-align: center; padding: 20px; background-color: #CC0000;">
    <img src="/sompo-logo-white.svg" alt="Sompo" style="height: 60px;" />
  </div>
  <div style="padding: 30px; background-color: #ffffff;">
    <p>Dear {{brokerName}},</p>

    <p>Thank you for your submission <strong>{{submissionRef}}</strong> for <strong>{{insuredName}}</strong>.</p>

    <p>After careful review, we regret to inform you that we are unable to provide a quotation for this risk at this time.</p>

    <h3 style="color: #CC0000;">Reason for Decline:</h3>
    <p>{{declineReason}}</p>

    <p>We appreciate your interest in Sompo International and hope to work with you on future opportunities that better align with our underwriting appetite.</p>

    <p>If you have any questions regarding this decision, please feel free to contact me directly.</p>

    <p>Best regards,<br/>
    <strong>{{underwriterName}}</strong><br/>
    Sompo International<br/>
    {{underwriterEmail}}</p>
  </div>
  <div style="padding: 20px; background-color: #f5f5f5; text-align: center; font-size: 12px; color: #666;">
    <p>Sompo International | Global Underwriting Excellence</p>
  </div>
</div>`
    },
    {
      id: 4,
      name: 'Quote Issued',
      subject: 'Quotation Issued - {{submissionRef}}',
      category: 'Quote Communication',
      lastModified: '2024-10-22',
      content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="text-align: center; padding: 20px; background-color: #CC0000;">
    <img src="/sompo-logo-white.svg" alt="Sompo" style="height: 60px;" />
  </div>
  <div style="padding: 30px; background-color: #ffffff;">
    <p>Dear {{brokerName}},</p>

    <p>We are pleased to provide our quotation for <strong>{{insuredName}}</strong> - submission reference <strong>{{submissionRef}}</strong>.</p>

    <h3 style="color: #CC0000;">Quote Summary:</h3>
    <ul>
      <li><strong>Premium:</strong> {{quotedPremium}}</li>
      <li><strong>Limit:</strong> {{limit}}</li>
      <li><strong>Deductible:</strong> {{deductible}}</li>
      <li><strong>Valid Until:</strong> {{quoteExpiry}}</li>
    </ul>

    <p>Please find the detailed quotation and terms attached to this email.</p>

    <p>This quotation is subject to our standard terms and conditions and is valid until <strong>{{quoteExpiry}}</strong>.</p>

    <p>Should you require any clarification or wish to discuss the terms, please don't hesitate to contact me.</p>

    <p>Best regards,<br/>
    <strong>{{underwriterName}}</strong><br/>
    Sompo International<br/>
    {{underwriterEmail}}</p>
  </div>
  <div style="padding: 20px; background-color: #f5f5f5; text-align: center; font-size: 12px; color: #666;">
    <p>Sompo International | Global Underwriting Excellence</p>
  </div>
</div>`
    },
    {
      id: 5,
      name: 'Binding Confirmation',
      subject: 'Binding Confirmation - {{submissionRef}}',
      category: 'Binding Communication',
      lastModified: '2024-10-21',
      content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="text-align: center; padding: 20px; background-color: #CC0000;">
    <img src="/sompo-logo-white.svg" alt="Sompo" style="height: 60px;" />
  </div>
  <div style="padding: 30px; background-color: #ffffff;">
    <p>Dear {{brokerName}},</p>

    <p>This email confirms that we have bound the risk for <strong>{{insuredName}}</strong> - submission reference <strong>{{submissionRef}}</strong>.</p>

    <h3 style="color: #CC0000;">Policy Details:</h3>
    <ul>
      <li><strong>Policy Number:</strong> {{policyNumber}}</li>
      <li><strong>Inception Date:</strong> {{inceptionDate}}</li>
      <li><strong>Expiry Date:</strong> {{expiryDate}}</li>
      <li><strong>Premium:</strong> {{premium}}</li>
    </ul>

    <p>Policy documents will be issued within <strong>{{documentIssuanceTime}}</strong> business days.</p>

    <p>Thank you for placing this business with Sompo International. We look forward to a successful partnership.</p>

    <p>Best regards,<br/>
    <strong>{{underwriterName}}</strong><br/>
    Sompo International<br/>
    {{underwriterEmail}}</p>
  </div>
  <div style="padding: 20px; background-color: #f5f5f5; text-align: center; font-size: 12px; color: #666;">
    <p>Sompo International | Global Underwriting Excellence</p>
  </div>
</div>`
    }
  ])

  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const [editedSubject, setEditedSubject] = useState('')
  const [editedName, setEditedName] = useState('')

  const handleEdit = (template) => {
    setSelectedTemplate(template)
    setEditedContent(template.content)
    setEditedSubject(template.subject)
    setEditedName(template.name)
    setIsEditing(true)
  }

  const handlePreview = (template) => {
    setSelectedTemplate(template)
    setIsPreview(true)
  }

  const handleSave = () => {
    if (selectedTemplate) {
      setTemplates(templates.map(t =>
        t.id === selectedTemplate.id
          ? {
              ...t,
              name: editedName,
              subject: editedSubject,
              content: editedContent,
              lastModified: new Date().toISOString().split('T')[0]
            }
          : t
      ))
    }
    setIsEditing(false)
    setSelectedTemplate(null)
  }

  const applyFormatting = (command, value = null) => {
    document.execCommand(command, false, value)
  }

  const insertVariable = (variable) => {
    const textarea = document.getElementById('content-editor')
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = editedContent
      const before = text.substring(0, start)
      const after = text.substring(end, text.length)
      setEditedContent(before + `{{${variable}}}` + after)
    }
  }

  const availableVariables = [
    'submissionRef',
    'insuredName',
    'brokerName',
    'underwriterName',
    'underwriterEmail',
    'lob',
    'gwp',
    'inceptionDate',
    'expiryDate',
    'limit',
    'deductible',
    'premium',
    'quotedPremium',
    'quoteExpiry',
    'policyNumber',
    'slaTime',
    'documentIssuanceTime',
    'declineReason',
    'requiredItem1',
    'requiredItem2',
    'requiredItem3'
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1680px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Mail className="w-8 h-8 text-sompo-red" />
              Email Templates
            </h1>
            <p className="text-gray-600">Manage email templates for submission communications</p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-xs text-gray-500">{template.category}</p>
                  </div>
                  <Mail className="w-6 h-6 text-sompo-red" />
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Subject:</strong> {template.subject}
                  </p>
                  <p className="text-xs text-gray-500">Last modified: {template.lastModified}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(template)}
                    className="flex-1 px-3 py-2 bg-sompo-red text-white rounded-lg hover:bg-sompo-dark-red text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handlePreview(template)}
                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Edit Modal */}
          {isEditing && selectedTemplate && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsEditing(false)} />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-sompo-red to-sompo-dark-red text-white px-6 py-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Edit Template: {selectedTemplate.name}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-white text-sompo-red rounded-lg hover:bg-gray-100 font-medium flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="text-white hover:bg-white/20 rounded-full p-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Editor */}
                      <div className="lg:col-span-2 space-y-4">
                        {/* Template Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                          />
                        </div>

                        {/* Subject Line */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                          <input
                            type="text"
                            value={editedSubject}
                            onChange={(e) => setEditedSubject(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                          />
                        </div>

                        {/* Content Editor */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Content (HTML)</label>
                          <textarea
                            id="content-editor"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            rows={20}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red font-mono text-sm"
                          />
                        </div>
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-4">
                        {/* Preview */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Preview</h4>
                          <div
                            className="bg-white rounded border border-gray-200 p-4 max-h-80 overflow-y-auto text-xs"
                            dangerouslySetInnerHTML={{ __html: editedContent }}
                          />
                        </div>

                        {/* Variables */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Available Variables</h4>
                          <p className="text-xs text-gray-600 mb-3">Click to insert into template</p>
                          <div className="space-y-1 max-h-80 overflow-y-auto">
                            {availableVariables.map((variable) => (
                              <button
                                key={variable}
                                onClick={() => insertVariable(variable)}
                                className="w-full text-left px-2 py-1 text-xs font-mono bg-white border border-gray-200 rounded hover:bg-gray-100 hover:border-sompo-red"
                              >
                                {`{{${variable}}}`}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}

          {/* Preview Modal */}
          {isPreview && selectedTemplate && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsPreview(false)} />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-sompo-red to-sompo-dark-red text-white px-6 py-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Preview: {selectedTemplate.name}</h3>
                    <button
                      onClick={() => setIsPreview(false)}
                      className="text-white hover:bg-white/20 rounded-full p-2"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        <strong>Subject:</strong> {selectedTemplate.subject}
                      </p>
                    </div>
                    <div
                      className="border border-gray-200 rounded-lg p-4"
                      dangerouslySetInnerHTML={{ __html: selectedTemplate.content }}
                    />
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default EmailTemplates
