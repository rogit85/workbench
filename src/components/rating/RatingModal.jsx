import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calculator,
  Building2,
  Shield,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  FileText,
  MapPin,
  Info,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

const RatingModal = ({ isOpen, onClose, submission, onRatingComplete }) => {
  const [activeTab, setActiveTab] = useState("coverage");
  const [ratingData, setRatingData] = useState({
    currency: "GBP",
    coverage: {
      property: true,
      generalLiability: false,
      employersLiability: false,
      professionalIndemnity: false,
      option: "Combined PD & BI",
      limitOfIndemnity: 60000000,
      sompoShare: 17,
      catModellingStatus: "VALIDATED",
      biIndemnityPeriod: 12,
    },
    premium: {
      actualPremium: 32254,
      coreCoverages: 32254,
      extensions: 0,
      terrorism: 0,
      technicalPremium: 74983,
      modelTechnicalPremium: 74983,
    },
    lossLoad: {
      mechanicalELC: 57362,
      uwAdjustedELC: 57362,
      exposureRatedELC: 57362,
    },
    profitability: {
      lossRatio: 177.8,
      acquisitionCostsRatio: 3.5,
      expenseRatio: 0.0,
      combinedRatio: 181.3,
      modelTechnicalAdequacy: 43.0,
      uwTechnicalAdequacy: 43.0,
    },
    rateChange: {
      expiringPremium: 0,
      changeInPremium: 32254,
      changeInRate: {
        limitRetention: -77.3,
        coverageTerms: 0.0,
        measuredExposure: 0.0,
        otherExposure: 0.0,
      },
    },
    locations: [],
    occupancySearch: "",
    selectedOccupancy: null,
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  // Occupancy list (subset for demonstration)
  const occupancies = [
    {
      code: "5148",
      name: "FRESH FRUITS AND VEGETABLES",
      category: "Wholesale Trade",
    },
    { code: "3291", name: "ABRASIVE PRODUCTS", category: "Manufacturing" },
    {
      code: "6321",
      name: "ACCIDENT AND HEALTH INSURANCE",
      category: "Insurance",
    },
    {
      code: "8721",
      name: "ACCOUNTING, AUDITING, AND BOOKKEEPING SERVICES",
      category: "Professional Services",
    },
    { code: "2891", name: "ADHESIVES AND SEALANTS", category: "Manufacturing" },
    {
      code: "7322",
      name: "ADJUSTMENT AND COLLECTION SERVICES",
      category: "Business Services",
    },
    {
      code: "9411",
      name: "ADMINISTRATION OF EDUCATIONAL PROGRAMS",
      category: "Government",
    },
    {
      code: "9611",
      name: "ADMINISTRATION OF GENERAL ECONOMIC PROGRAMS",
      category: "Government",
    },
    {
      code: "5531",
      name: "AUTO AND HOME SUPPLY STORES",
      category: "Retail Trade",
    },
    { code: "7241", name: "BARBER SHOPS", category: "Personal Services" },
    { code: "7231", name: "BEAUTY SHOPS", category: "Personal Services" },
    { code: "0211", name: "BEEF CATTLE FEEDLOTS", category: "Agriculture" },
    { code: "5181", name: "BEER AND ALE", category: "Wholesale Trade" },
    { code: "0171", name: "BERRY CROPS", category: "Agriculture" },
    {
      code: "2731",
      name: "BOOKS: PUBLISHING, OR PUBLISHING AND PRINTING",
      category: "Publishing",
    },
    { code: "7933", name: "BOWLING CENTERS", category: "Entertainment" },
    {
      code: "1541",
      name: "GENERAL CONTRACTORS-INDUSTRIAL BUILDINGS",
      category: "Construction",
    },
    {
      code: "1542",
      name: "GENERAL CONTRACTORS-NONRESIDENTIAL BUILDINGS",
      category: "Construction",
    },
    {
      code: "8062",
      name: "GENERAL MEDICAL AND SURGICAL HOSPITALS",
      category: "Healthcare",
    },
    {
      code: "4225",
      name: "GENERAL WAREHOUSING AND STORAGE",
      category: "Transportation",
    },
    { code: "5251", name: "HARDWARE STORES", category: "Retail Trade" },
    { code: "7011", name: "HOTELS AND MOTELS", category: "Hospitality" },
    { code: "8111", name: "LEGAL SERVICES", category: "Professional Services" },
    { code: "2451", name: "MOBILE HOMES", category: "Manufacturing" },
    {
      code: "5251",
      name: "OFFICE SUPPLIES AND STATIONERY",
      category: "Retail Trade",
    },
    { code: "2911", name: "PETROLEUM REFINING", category: "Manufacturing" },
    {
      code: "8011",
      name: "OFFICES OF DOCTORS OF MEDICINE",
      category: "Healthcare",
    },
    { code: "5812", name: "EATING PLACES", category: "Food Service" },
    {
      code: "6798",
      name: "REAL ESTATE INVESTMENT TRUSTS",
      category: "Real Estate",
    },
    {
      code: "8299",
      name: "SCHOOLS AND EDUCATIONAL SERVICES",
      category: "Education",
    },
  ];

  const filteredOccupancies = occupancies.filter(
    (occ) =>
      occ.name
        .toLowerCase()
        .includes(ratingData.occupancySearch.toLowerCase()) ||
      occ.code.includes(ratingData.occupancySearch),
  );

  const handleCalculate = () => {
    setIsCalculating(true);
    setValidationErrors([]);

    // Simulate calculation process
    setTimeout(() => {
      // Calculate various components
      const technicalPremium = Math.floor(
        ratingData.coverage.limitOfIndemnity * 0.00125,
      );
      const actualPremium = Math.floor(technicalPremium * 0.43);
      const elc = Math.floor(technicalPremium * 0.765);

      setRatingData((prev) => ({
        ...prev,
        premium: {
          ...prev.premium,
          actualPremium,
          coreCoverages: actualPremium,
          technicalPremium,
          modelTechnicalPremium: technicalPremium,
        },
        lossLoad: {
          mechanicalELC: elc,
          uwAdjustedELC: elc,
          exposureRatedELC: elc,
        },
      }));

      setIsCalculating(false);
    }, 2000);
  };

  const handleComplete = () => {
    const errors = [];

    if (!ratingData.selectedOccupancy) {
      errors.push("Please select an occupancy type");
    }

    if (ratingData.locations.length === 0) {
      errors.push("Please add at least one location");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    onRatingComplete({
      ...ratingData,
      status: "Rated",
      timestamp: new Date().toISOString(),
    });
  };

  const tabs = [
    { id: "coverage", label: "Coverage Summary", icon: Shield },
    { id: "premium", label: "Premium Summary", icon: DollarSign },
    { id: "profitability", label: "Profitability", icon: TrendingUp },
    { id: "locations", label: "Locations", icon: MapPin },
    { id: "occupancy", label: "Occupancy", icon: Building2 },
    { id: "technical", label: "Technical Pricing", icon: Calculator },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Calculator className="w-6 h-6" />
                    Rating & Pricing Analysis
                  </h2>
                  <p className="text-red-100 mt-1">
                    {submission?.brokerName} - {submission?.insuredName}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-red-600 text-red-600 bg-white"
                        : "border-transparent text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              {/* Coverage Summary Tab */}
              {activeTab === "coverage" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Coverage Options
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={ratingData.coverage.property}
                            onChange={(e) =>
                              setRatingData((prev) => ({
                                ...prev,
                                coverage: {
                                  ...prev.coverage,
                                  property: e.target.checked,
                                },
                              }))
                            }
                            className="w-4 h-4 text-red-600"
                          />
                          <span>Property</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={ratingData.coverage.generalLiability}
                            onChange={(e) =>
                              setRatingData((prev) => ({
                                ...prev,
                                coverage: {
                                  ...prev.coverage,
                                  generalLiability: e.target.checked,
                                },
                              }))
                            }
                            className="w-4 h-4 text-red-600"
                          />
                          <span>General Liability</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={ratingData.coverage.employersLiability}
                            onChange={(e) =>
                              setRatingData((prev) => ({
                                ...prev,
                                coverage: {
                                  ...prev.coverage,
                                  employersLiability: e.target.checked,
                                },
                              }))
                            }
                            className="w-4 h-4 text-red-600"
                          />
                          <span>Employers Liability</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={ratingData.coverage.professionalIndemnity}
                            onChange={(e) =>
                              setRatingData((prev) => ({
                                ...prev,
                                coverage: {
                                  ...prev.coverage,
                                  professionalIndemnity: e.target.checked,
                                },
                              }))
                            }
                            className="w-4 h-4 text-red-600"
                          />
                          <span>Professional Indemnity</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Coverage Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-600">
                            Coverage Option
                          </label>
                          <select
                            value={ratingData.coverage.option}
                            onChange={(e) =>
                              setRatingData((prev) => ({
                                ...prev,
                                coverage: {
                                  ...prev.coverage,
                                  option: e.target.value,
                                },
                              }))
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            <option>Combined PD & BI</option>
                            <option>Property Damage Only</option>
                            <option>Business Interruption Only</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">
                            Limit of Indemnity (Non-Cat)
                          </label>
                          <input
                            type="number"
                            value={ratingData.coverage.limitOfIndemnity}
                            onChange={(e) =>
                              setRatingData((prev) => ({
                                ...prev,
                                coverage: {
                                  ...prev.coverage,
                                  limitOfIndemnity: parseInt(e.target.value),
                                },
                              }))
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">
                            Sompo Share (%)
                          </label>
                          <input
                            type="number"
                            value={ratingData.coverage.sompoShare}
                            onChange={(e) =>
                              setRatingData((prev) => ({
                                ...prev,
                                coverage: {
                                  ...prev.coverage,
                                  sompoShare: parseInt(e.target.value),
                                },
                              }))
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg flex items-center gap-3 ${
                      ratingData.coverage.catModellingStatus === "VALIDATED"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    <Info className="w-5 h-5" />
                    <span className="font-medium">
                      CAT Modelling Status:{" "}
                      {ratingData.coverage.catModellingStatus}
                    </span>
                  </div>
                </div>
              )}

              {/* Premium Summary Tab */}
              {activeTab === "premium" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">100% Share</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Actual Premium</span>
                          <span className="font-semibold">
                            £{ratingData.premium.actualPremium.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Core Property Coverages
                          </span>
                          <span>
                            £{ratingData.premium.coreCoverages.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Coverage Extensions
                          </span>
                          <span>
                            £{ratingData.premium.extensions.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Terrorism</span>
                          <span>
                            £{ratingData.premium.terrorism.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t pt-3 flex justify-between font-semibold">
                          <span>UW Technical Premium</span>
                          <span>
                            £
                            {ratingData.premium.technicalPremium.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">
                        Sompo Share ({ratingData.coverage.sompoShare}%)
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Actual Premium</span>
                          <span className="font-semibold">
                            £
                            {Math.floor(
                              (ratingData.premium.actualPremium *
                                ratingData.coverage.sompoShare) /
                                100,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Core Property Coverages
                          </span>
                          <span>
                            £
                            {Math.floor(
                              (ratingData.premium.coreCoverages *
                                ratingData.coverage.sompoShare) /
                                100,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t pt-3 flex justify-between font-semibold">
                          <span>UW Technical Premium</span>
                          <span>
                            £
                            {Math.floor(
                              (ratingData.premium.technicalPremium *
                                ratingData.coverage.sompoShare) /
                                100,
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Expected Loss Components
                    </h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">
                          Mechanical Model ELC:
                        </span>
                        <span className="font-semibold ml-2">
                          £{ratingData.lossLoad.mechanicalELC.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          UW-Adjusted Model ELC:
                        </span>
                        <span className="font-semibold ml-2">
                          £{ratingData.lossLoad.uwAdjustedELC.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          Exposure-Rated Model ELC:
                        </span>
                        <span className="font-semibold ml-2">
                          £
                          {ratingData.lossLoad.exposureRatedELC.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profitability Tab */}
              {activeTab === "profitability" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Pricing Profitability Ratios
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Loss Ratio</span>
                            <span
                              className={`font-semibold text-lg ${
                                ratingData.profitability.lossRatio > 100
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {ratingData.profitability.lossRatio}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                ratingData.profitability.lossRatio > 100
                                  ? "bg-red-600"
                                  : "bg-green-600"
                              }`}
                              style={{
                                width: `${Math.min(ratingData.profitability.lossRatio, 100)}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Acquisition Costs Ratio
                            </span>
                            <span>
                              {ratingData.profitability.acquisitionCostsRatio}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Expense Ratio</span>
                            <span>
                              {ratingData.profitability.expenseRatio}%
                            </span>
                          </div>
                          <div className="flex justify-between font-semibold text-lg border-t pt-2">
                            <span>Combined Ratio</span>
                            <span
                              className={
                                ratingData.profitability.combinedRatio > 100
                                  ? "text-red-600"
                                  : "text-green-600"
                              }
                            >
                              {ratingData.profitability.combinedRatio}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Technical Pricing Adequacy
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">
                              Model Technical Adequacy
                            </span>
                            <span className="font-semibold text-lg text-blue-600">
                              {ratingData.profitability.modelTechnicalAdequacy}%
                            </span>
                          </div>
                          <div className="w-full bg-blue-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${ratingData.profitability.modelTechnicalAdequacy}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">
                              UW Technical Adequacy
                            </span>
                            <span className="font-semibold text-lg text-purple-600">
                              {ratingData.profitability.uwTechnicalAdequacy}%
                            </span>
                          </div>
                          <div className="w-full bg-purple-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{
                                width: `${ratingData.profitability.uwTechnicalAdequacy}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Rate Change Analysis</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">
                          Change in Rate due to Limit/Retention:
                        </span>
                        <span className="font-semibold ml-2">
                          {ratingData.rateChange.changeInRate.limitRetention}%
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">
                          Change in Premium:
                        </span>
                        <span className="font-semibold ml-2">
                          £
                          {ratingData.rateChange.changeInPremium.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Locations Tab */}
              {activeTab === "locations" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Property Locations
                    </h3>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Add Location
                    </button>
                  </div>

                  {ratingData.locations.length === 0 ? (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No locations added yet</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Add property locations to continue with rating
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Location cards would go here */}
                    </div>
                  )}
                </div>
              )}

              {/* Occupancy Tab */}
              {activeTab === "occupancy" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Trade/Occupancy Search
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        value={ratingData.occupancySearch}
                        onChange={(e) =>
                          setRatingData((prev) => ({
                            ...prev,
                            occupancySearch: e.target.value,
                          }))
                        }
                        placeholder="Search by trade name or code (e.g., 'Fresh' for Fresh Fruits)"
                        className="w-full px-4 py-3 border rounded-lg pl-10"
                      />
                      <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {ratingData.occupancySearch && (
                    <div className="bg-white border rounded-lg max-h-96 overflow-y-auto">
                      {filteredOccupancies.length === 0 ? (
                        <p className="p-4 text-gray-500 text-center">
                          No matching occupancies found
                        </p>
                      ) : (
                        filteredOccupancies.map((occ) => (
                          <button
                            key={occ.code}
                            onClick={() =>
                              setRatingData((prev) => ({
                                ...prev,
                                selectedOccupancy: occ,
                                occupancySearch: occ.name,
                              }))
                            }
                            className={`w-full text-left p-4 hover:bg-gray-50 border-b transition-colors ${
                              ratingData.selectedOccupancy?.code === occ.code
                                ? "bg-red-50"
                                : ""
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{occ.name}</p>
                                <p className="text-sm text-gray-600">
                                  Code: {occ.code} | {occ.category}
                                </p>
                              </div>
                              {ratingData.selectedOccupancy?.code ===
                                occ.code && (
                                <Check className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}

                  {ratingData.selectedOccupancy && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">
                        Selected Occupancy
                      </h4>
                      <p className="text-green-700">
                        {ratingData.selectedOccupancy.name}
                      </p>
                      <p className="text-sm text-green-600">
                        Code: {ratingData.selectedOccupancy.code} |{" "}
                        {ratingData.selectedOccupancy.category}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Technical Pricing Tab */}
              {activeTab === "technical" && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">
                      Property Technical Pricing Summary
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-3">
                          All-Coverage Technical Premium
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Core Property Coverages</span>
                            <span className="font-semibold">
                              £
                              {ratingData.premium.technicalPremium.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Terrorism</span>
                            <span>£0</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Coverage Extensions</span>
                            <span>£0</span>
                          </div>
                          <div className="flex justify-between font-semibold text-lg border-t pt-2">
                            <span>Total</span>
                            <span>
                              £
                              {ratingData.premium.technicalPremium.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-6 bg-gray-50">
              <div className="flex items-center justify-between">
                {validationErrors.length > 0 && (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">{validationErrors[0]}</span>
                  </div>
                )}

                <div className="flex space-x-4 ml-auto">
                  <button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center disabled:opacity-50"
                  >
                    {isCalculating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate Premium
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleComplete}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Complete Rating
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RatingModal;
