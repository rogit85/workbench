import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Calculator,
  FileText,
  Send,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Clock,
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Shield,
  Users,
  Calendar,
  Award,
  Activity,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import RatingModal from "../components/rating/RatingModal";
import { submissionsData } from "../data/mockData";
import { generateQuote } from "../utils/quoteGenerator";
import useToast from "../hooks/useToast";
import Toast from "../components/Toast";

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const submission = submissionsData.find((sub) => sub.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedSubmission, setEditedSubmission] = useState(submission);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [ratingProgress, setRatingProgress] = useState(0);
  const [notes, setNotes] = useState(submission?.notes || "");
  const { toast, showToast, hideToast } = useToast();

  if (!submission) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Submission Not Found
            </h1>
            <Link to="/submissions" className="text-red-600 hover:text-red-700">
              ← Back to Submissions
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-100";
      case "Quote Generated":
        return "text-blue-600 bg-blue-100";
      case "Rated":
        return "text-purple-600 bg-purple-100";
      case "Under Review":
        return "text-yellow-600 bg-yellow-100";
      case "Pending Information":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleRate = () => {
    setShowRatingModal(true);
  };

  const handleRatingComplete = (ratingData) => {
    // Update submission with rating data
    const updatedSubmission = {
      ...editedSubmission,
      status: "Rated",
      calculatedPremium: ratingData.premium.actualPremium,
      ratingData: ratingData,
    };
    setEditedSubmission(updatedSubmission);
    setShowRatingModal(false);
  };

  const handleGenerateQuote = async () => {
    try {
      // Generate the quote document
      const result = await generateQuote(
        editedSubmission,
        editedSubmission.ratingData,
      );

      // Update submission status to quote generated
      const updatedSubmission = {
        ...editedSubmission,
        status: "Quote Generated",
        quoteGenerated: true,
      };
      setEditedSubmission(updatedSubmission);

      showToast(`Quote generated successfully: ${result.fileName}`, "success");
    } catch (error) {
      console.error("Error generating quote:", error);
      showToast("Failed to generate quote. Please try again.", "error");
    }
  };

  const handleApproval = (approved) => {
    const updatedSubmission = {
      ...editedSubmission,
      status: approved ? "Approved" : "Declined",
      approved: approved,
    };
    setEditedSubmission(updatedSubmission);
    setShowApprovalModal(false);
  };

  const InfoCard = ({ title, children, icon: Icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        {Icon && <Icon className="w-5 h-5 text-red-600 mr-2" />}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => navigate("/submissions")}
                  className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold gradient-text"
                  >
                    {editedSubmission.insuredName}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-600 mt-1"
                  >
                    Submission {editedSubmission.id} •{" "}
                    {editedSubmission.businessType}
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(editedSubmission.status)}`}
                >
                  {editedSubmission.status}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(editedSubmission.priority)}`}
                >
                  {editedSubmission.priority} Priority
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Business Information */}
              <InfoCard title="Business Information" icon={Building}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Business Name
                    </label>
                    <p className="text-gray-900 font-medium">
                      {editedSubmission.insuredName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Business Type
                    </label>
                    <p className="text-gray-900">
                      {editedSubmission.businessType}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Location
                    </label>
                    <p className="text-gray-900 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      {editedSubmission.location}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Annual Turnover
                    </label>
                    <p className="text-gray-900 font-medium">
                      £{editedSubmission.turnover.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Number of Employees
                    </label>
                    <p className="text-gray-900 flex items-center">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      {editedSubmission.employees}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Submission Date
                    </label>
                    <p className="text-gray-900 flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {new Date(
                        editedSubmission.submissionDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </InfoCard>

              {/* Coverage Details */}
              <InfoCard title="Coverage Details" icon={Shield}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Coverage Type
                    </label>
                    <p className="text-gray-900 font-medium">
                      {editedSubmission.coverageType}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Requested Limit
                    </label>
                    <p className="text-gray-900 font-medium">
                      £{editedSubmission.requestedLimit.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Previous Claims
                    </label>
                    <p className="text-gray-900">
                      {editedSubmission.previousClaims} claims
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Claims Value
                    </label>
                    <p className="text-gray-900">
                      £{editedSubmission.claimsValue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-600">
                    Risk Factors
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editedSubmission.riskFactors.map((factor, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </InfoCard>

              {/* Premium Information */}
              <InfoCard title="Premium Calculation" icon={Calculator}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editedSubmission.targetPremium && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Target Premium
                      </label>
                      <p className="text-gray-900 font-medium">
                        £{editedSubmission.targetPremium.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {editedSubmission.calculatedPremium && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Calculated Premium
                      </label>
                      <p
                        className={`font-bold text-lg ${
                          editedSubmission.calculatedPremium <=
                          (editedSubmission.targetPremium || Infinity)
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        £{editedSubmission.calculatedPremium.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                {!editedSubmission.calculatedPremium && (
                  <div className="mt-4">
                    <button
                      onClick={handleRate}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Premium
                    </button>
                  </div>
                )}
              </InfoCard>

              {/* Notes and Actions */}
              <InfoCard title="Notes & Actions" icon={Edit}>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Add notes about this submission..."
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {editedSubmission.calculatedPremium &&
                      !editedSubmission.quoteGenerated && (
                        <button
                          onClick={handleGenerateQuote}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Quote
                        </button>
                      )}

                    {editedSubmission.quoteGenerated &&
                      editedSubmission.approved === null && (
                        <button
                          onClick={() => setShowApprovalModal(true)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Review for Approval
                        </button>
                      )}

                    {editedSubmission.quoteGenerated && (
                      <button
                        onClick={async () => {
                          try {
                            const result = await generateQuote(
                              editedSubmission,
                              editedSubmission.ratingData,
                            );
                            showToast(
                              `Quote downloaded: ${result.fileName}`,
                              "success",
                            );
                          } catch (error) {
                            showToast(
                              "Failed to download quote. Please try again.",
                              "error",
                            );
                          }
                        }}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Quote
                      </button>
                    )}

                    {editedSubmission.approved === true && (
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Send to Guidewire
                      </button>
                    )}
                  </div>
                </div>
              </InfoCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <InfoCard title="Broker Contact" icon={User}>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Broker
                    </label>
                    <p className="text-gray-900 font-medium">
                      {editedSubmission.broker}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="text-gray-900 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <a
                        href={`mailto:${editedSubmission.contactEmail}`}
                        className="text-red-600 hover:text-red-700"
                      >
                        {editedSubmission.contactEmail}
                      </a>
                    </p>
                  </div>
                </div>
              </InfoCard>

              {/* Timeline */}
              <InfoCard title="Timeline" icon={Clock}>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Submission Received
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(
                          editedSubmission.submissionDate,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {editedSubmission.calculatedPremium && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Premium Calculated
                        </p>
                        <p className="text-sm text-gray-600">Today</p>
                      </div>
                    </div>
                  )}

                  {editedSubmission.quoteGenerated && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Quote Generated
                        </p>
                        <p className="text-sm text-gray-600">Today</p>
                      </div>
                    </div>
                  )}
                </div>
              </InfoCard>

              {/* Risk Assessment */}
              <InfoCard title="Risk Assessment" icon={AlertTriangle}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Claims History
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        editedSubmission.previousClaims === 0
                          ? "bg-green-100 text-green-800"
                          : editedSubmission.previousClaims <= 3
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {editedSubmission.previousClaims === 0
                        ? "Clean"
                        : editedSubmission.previousClaims <= 3
                          ? "Moderate"
                          : "High"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Business Type</span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      Standard
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Location Risk</span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      Low
                    </span>
                  </div>
                </div>
              </InfoCard>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        submission={editedSubmission}
        onRatingComplete={handleRatingComplete}
      />

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Approve Submission?
              </h3>
              <p className="text-gray-600 mb-6">
                Review the calculated premium and decide whether to approve this
                submission.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Calculated Premium:</span>
                  <span className="font-bold text-lg">
                    £{editedSubmission.calculatedPremium?.toLocaleString()}
                  </span>
                </div>
                {editedSubmission.targetPremium && (
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600">Target Premium:</span>
                    <span>
                      £{editedSubmission.targetPremium.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleApproval(false)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleApproval(true)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
              </div>

              <button
                onClick={() => setShowApprovalModal(false)}
                className="mt-3 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </PageTransition>
  );
};

export default SubmissionDetail;
