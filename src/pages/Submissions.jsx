import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  Calculator,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import { submissionsData } from "../data/mockData";
import { generateQuote } from "../utils/quoteGenerator";
import useToast from "../hooks/useToast";
import Toast from "../components/Toast";

const Submissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("submissionDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const { toast, showToast, hideToast } = useToast();

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4" />;
      case "Quote Generated":
        return <FileText className="w-4 h-4" />;
      case "Rated":
        return <Calculator className="w-4 h-4" />;
      case "Under Review":
        return <Clock className="w-4 h-4" />;
      case "Pending Information":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

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

  const filteredSubmissions = submissionsData
    .filter((submission) => {
      const matchesSearch =
        submission.insuredName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        submission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.businessType
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || submission.status === statusFilter;
      const matchesPriority =
        priorityFilter === "All" || submission.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "submissionDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const uniqueStatuses = [...new Set(submissionsData.map((sub) => sub.status))];
  const uniquePriorities = [
    ...new Set(submissionsData.map((sub) => sub.priority)),
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold gradient-text"
            >
              Submissions Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mt-2"
            >
              View and manage all insurance submissions from the submission
              centre
            </motion.p>
          </div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="All">All Statuses</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="All">All Priorities</option>
                  {uniquePriorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split("-");
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="submissionDate-desc">Latest First</option>
                  <option value="submissionDate-asc">Oldest First</option>
                  <option value="insuredName-asc">Name A-Z</option>
                  <option value="insuredName-desc">Name Z-A</option>
                  <option value="turnover-desc">Turnover High-Low</option>
                  <option value="turnover-asc">Turnover Low-High</option>
                </select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {filteredSubmissions.length}
                </p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {
                    filteredSubmissions.filter(
                      (sub) =>
                        sub.status.includes("Pending") ||
                        sub.status.includes("Under Review"),
                    ).length
                  }
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {
                    filteredSubmissions.filter((sub) => sub.quoteGenerated)
                      .length
                  }
                </p>
                <p className="text-sm text-gray-600">Quoted</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {
                    filteredSubmissions.filter((sub) => sub.approved === true)
                      .length
                  }
                </p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </div>
          </motion.div>

          {/* Submissions Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coverage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Premium
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {submission.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(
                              submission.submissionDate,
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {submission.insuredName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {submission.businessType} • {submission.location}
                          </div>
                          <div className="text-sm text-gray-500">
                            £{submission.turnover.toLocaleString()} •{" "}
                            {submission.employees} employees
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {submission.coverageType}
                          </div>
                          <div className="text-sm text-gray-500">
                            Limit: £{submission.requestedLimit.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            Claims: {submission.previousClaims} (£
                            {submission.claimsValue.toLocaleString()})
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          {submission.targetPremium && (
                            <div className="text-sm text-gray-500">
                              Target: £
                              {submission.targetPremium.toLocaleString()}
                            </div>
                          )}
                          {submission.calculatedPremium && (
                            <div
                              className={`text-sm font-medium ${
                                submission.calculatedPremium <=
                                (submission.targetPremium || Infinity)
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              Calc: £
                              {submission.calculatedPremium.toLocaleString()}
                            </div>
                          )}
                          {!submission.calculatedPremium && (
                            <div className="text-sm text-gray-400">
                              Not calculated
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}
                        >
                          {getStatusIcon(submission.status)}
                          <span className="ml-1">{submission.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(submission.priority)}`}
                        >
                          {submission.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/submissions/${submission.id}`}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                          {submission.quoteGenerated && (
                            <button
                              onClick={async () => {
                                try {
                                  const result =
                                    await generateQuote(submission);
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
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Quote
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSubmissions.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No submissions found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </motion.div>

          {/* Auto-import Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">
                  Auto-import Active
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Last sync: Today at 09:30 AM • Next sync: Today at 10:00 AM
                  <br />
                  Automatically pulling submissions from Excel spreadsheet every
                  30 minutes
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

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

export default Submissions;
