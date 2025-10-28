import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Filter, GripVertical, LayoutGrid, Table as TableIcon, Settings, Save, X, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ManualSubmissionModal from '../components/ManualSubmissionModal'
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'

// Sortable Table Header Component
const SortableTableHeader = ({ column, sortBy, sortOrder, onClick, onSort }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <th
      ref={setNodeRef}
      style={style}
      className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50 border-r border-gray-200 last:border-r-0"
    >
      <div className="flex items-center gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing flex-shrink-0"
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4 text-gray-400 hover:text-sompo-red" />
        </div>
        <div
          onClick={() => onClick(column.id)}
          className="flex items-center gap-2 cursor-pointer hover:text-sompo-red flex-1"
        >
          <span>{column.label}</span>
          {sortBy === column.id && (
            sortOrder === 'asc'
              ? <ChevronUp className="w-4 h-4 text-sompo-red" />
              : <ChevronDown className="w-4 h-4 text-sompo-red" />
          )}
        </div>
      </div>
    </th>
  )
}

// Droppable Column Component
const DroppableColumn = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id })
  return (
    <div ref={setNodeRef} className="p-4 space-y-3 flex-1 min-h-[300px]">
      {children}
    </div>
  )
}

// Sortable Risk Card Component
const SortableRiskCard = ({ task, onClick, getSourceBadgeColor, getLOBColor }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const currency = (n) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(n)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-sompo-red text-white'
      case 'Medium': return 'bg-gray-600 text-white'
      case 'Low': return 'bg-gray-400 text-white'
      default: return 'bg-gray-200 text-gray-800'
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? 'shadow-2xl z-50' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing pt-1 text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Card Content */}
        <div className="flex-1 cursor-pointer min-w-0" onClick={onClick}>
          {/* Header with badges */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-medium text-gray-900 text-sm leading-tight flex-1 truncate">
              {task.insured}
            </h4>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>

          {/* Metadata badges */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${getSourceBadgeColor(task.source)}`}>
              {task.source}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold border-2 shadow-sm whitespace-nowrap ${getLOBColor(task.lob)}`}>
              {task.lob}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>Broker</span>
              <span className="font-medium text-gray-900 truncate ml-2">{task.broker}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>GWP</span>
              <span className="font-semibold text-gray-900">{currency(task.gwp)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Age</span>
              <span className="font-medium text-gray-900">{task.age}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const WorkQueue = () => {
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState('spreadsheet') // 'kanban' or 'spreadsheet'
  const [showColumnSettings, setShowColumnSettings] = useState(false)
  const [showSaveView, setShowSaveView] = useState(false)
  const [viewName, setViewName] = useState('')
  const [filters, setFilters] = useState({
    lob: 'All',
    source: 'All',
    priority: 'All'
  })

  // All available columns for spreadsheet
  const allColumns = [
    { id: 'id', label: 'ID', enabled: true, editable: false },
    { id: 'insured', label: 'Insured', enabled: true, editable: true },
    { id: 'broker', label: 'Broker', enabled: true, editable: true },
    { id: 'lob', label: 'LOB', enabled: true, editable: true },
    { id: 'gwp', label: 'GWP', enabled: true, editable: true },
    { id: 'priority', label: 'Priority', enabled: true, editable: true },
    { id: 'source', label: 'Source', enabled: true, editable: true },
    { id: 'age', label: 'Age', enabled: true, editable: false },
    { id: 'status', label: 'Status', enabled: true, editable: true },
    { id: 'underwriter', label: 'Underwriter', enabled: true, editable: true },
    { id: 'team', label: 'Team', enabled: true, editable: true },
    { id: 'inceptionDate', label: 'Inception Date', enabled: true, editable: true },
    { id: 'limit', label: 'Limit', enabled: true, editable: true },
    { id: 'deductible', label: 'Deductible', enabled: false, editable: true },
    { id: 'coverage', label: 'Coverage', enabled: false, editable: true },
    { id: 'placementType', label: 'Placement Type', enabled: false, editable: true },
    { id: 'newRenewal', label: 'New/Renewal', enabled: true, editable: true },
  ]

  const [visibleColumns, setVisibleColumns] = useState(allColumns)
  const [savedViews, setSavedViews] = useState([
    { id: 'default', name: 'Default View', columns: allColumns }
  ])
  const [currentView, setCurrentView] = useState('default')
  const [editingCell, setEditingCell] = useState(null) // { rowId, columnId }
  const [editValue, setEditValue] = useState('')
  const [sortBy, setSortBy] = useState('priority')
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'

  // Load saved views from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('workqueue_views')
    if (saved) {
      const parsed = JSON.parse(saved)
      setSavedViews(parsed)
    }
    const savedCols = localStorage.getItem('workqueue_columns')
    if (savedCols) {
      setVisibleColumns(JSON.parse(savedCols))
    }
  }, [])

  // Save views to localStorage
  const saveView = () => {
    if (!viewName.trim()) return
    const newView = {
      id: Date.now().toString(),
      name: viewName,
      columns: visibleColumns
    }
    const updated = [...savedViews, newView]
    setSavedViews(updated)
    localStorage.setItem('workqueue_views', JSON.stringify(updated))
    setCurrentView(newView.id)
    setShowSaveView(false)
    setViewName('')
  }

  const loadView = (viewId) => {
    const view = savedViews.find(v => v.id === viewId)
    if (view) {
      setVisibleColumns(view.columns)
      localStorage.setItem('workqueue_columns', JSON.stringify(view.columns))
      setCurrentView(viewId)
    }
  }

  const toggleColumn = (columnId) => {
    const updated = visibleColumns.map(col =>
      col.id === columnId ? { ...col, enabled: !col.enabled } : col
    )
    setVisibleColumns(updated)
    localStorage.setItem('workqueue_columns', JSON.stringify(updated))
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const [tasks, setTasks] = useState({
    received: [
      { id: 's001', insured: 'Atlas Foods Group', broker: 'Howden', lob: 'Property', gwp: 190000, priority: 'Medium', age: '2h', source: 'Email', underwriter: 'Jeremy Isaacs', team: 'Property', inceptionDate: '2025-01-15', limit: 5000000, newRenewal: 'New' },
      { id: 's002', insured: 'TechStart Innovations', broker: 'Marsh', lob: 'Cyber', gwp: 85000, priority: 'Low', age: '4h', source: 'API', underwriter: 'Sarah Chen', team: 'Specialty', inceptionDate: '2025-02-01', limit: 2000000, newRenewal: 'Renewal' },
    ],
    clearance: [
      { id: 's003', insured: 'Global Freight Ltd', broker: 'Aon', lob: 'Marine', gwp: 420000, priority: 'High', age: '6h', source: 'Email' },
      { id: 's004', insured: 'MediCare Plus', broker: 'Willis Towers Watson', lob: 'Healthcare Liability', gwp: 310000, priority: 'Medium', age: '1d', source: 'Manual' },
    ],
    moreInfo: [],
    appetite: [
      { id: 's005', insured: 'Hyperion Biotech', broker: 'Apex Risk Partners', lob: 'Life Sciences', gwp: 460000, priority: 'High', age: '1d', source: 'Email' },
      { id: 's006', insured: 'GreenEnergy Solutions', broker: 'JLT Specialty', lob: 'Energy', gwp: 890000, priority: 'High', age: '8h', source: 'API' },
    ],
    sanctions: [
      { id: 's007', insured: 'Continental Airlines', broker: 'Gallagher', lob: 'Aviation', gwp: 1250000, priority: 'High', age: '12h', source: 'Email' },
    ],
    rating: [
      { id: 's008', insured: 'Neptune Offshore Wind', broker: 'Westshore Willis', lob: 'Energy', gwp: 1875000, priority: 'High', age: '2d', source: 'Email' },
      { id: 's009', insured: 'Financial Trust Bank', broker: 'Lockton', lob: 'Financial Institutions', gwp: 720000, priority: 'Medium', age: '1d', source: 'API' },
    ],
    peerReview: [
      { id: 's010', insured: 'Cyber Shield Corp', broker: 'Howden', lob: 'Cyber', gwp: 340000, priority: 'Medium', age: '3d', source: 'Email' },
    ],
    quoted: [
      { id: 's011', insured: 'Orion AeroSystems', broker: 'Crestline Broking', lob: 'Aviation', gwp: 980000, priority: 'High', age: '4d', source: 'Email' },
      { id: 's012', insured: 'Phoenix Rail & Freight', broker: 'Gullwing Re', lob: 'Marine', gwp: 720000, priority: 'Medium', age: '5d', source: 'API' },
    ],
    firmOrder: [
      { id: 's013', insured: 'Silverline Hospitality', broker: 'Marsh Europe', lob: 'Property', gwp: 880000, priority: 'High', age: '2d', source: 'Email' },
    ],
    bound: [
      { id: 's014', insured: 'Lumenova Data Centers', broker: 'Cairnstone', lob: 'Property', gwp: 1320000, priority: 'High', age: '1d', source: 'Email' },
    ],
    issued: [
      { id: 's016', insured: 'Global Trade Solutions', broker: 'Marsh', lob: 'Marine', gwp: 950000, priority: 'High', age: '3h', source: 'API' },
    ],
    registered: [
      { id: 's017', insured: 'EcoEnergy Partners', broker: 'Willis', lob: 'Energy', gwp: 2100000, priority: 'High', age: '1d', source: 'Email' },
    ],
    declined: [
      { id: 's015', insured: 'High Risk Ventures', broker: 'Local Broker', lob: 'Casualty', gwp: 150000, priority: 'Low', age: '7d', source: 'Manual' },
    ]
  })

  const columns = [
    { id: 'received', title: 'Received', color: 'gray', icon: '📥' },
    { id: 'clearance', title: 'Clearance', color: 'blue', icon: '🔍' },
    { id: 'moreInfo', title: 'More Information Required', color: 'yellow', icon: '📝' },
    { id: 'appetite', title: 'Appetite Check', color: 'purple', icon: '🎯' },
    { id: 'sanctions', title: 'Sanctions', color: 'orange', icon: '⚠️' },
    { id: 'rating', title: 'Rating', color: 'indigo', icon: '💰' },
    { id: 'peerReview', title: 'Peer Review', color: 'teal', icon: '👥' },
    { id: 'quoted', title: 'Quoted', color: 'amber', icon: '📄' },
    { id: 'firmOrder', title: 'Firm Order', color: 'green', icon: '✓' },
    { id: 'bound', title: 'Bound', color: 'emerald', icon: '✅' },
    { id: 'issued', title: 'Issued', color: 'sky', icon: '📋' },
    { id: 'registered', title: 'Registered', color: 'cyan', icon: '🔖' },
    { id: 'declined', title: 'Declined', color: 'red', icon: '❌' },
  ]

  const getColumnColor = (color) => {
    switch (color) {
      case 'gray': return 'border-gray-400'
      case 'blue': return 'border-blue-500'
      case 'yellow': return 'border-yellow-500'
      case 'purple': return 'border-purple-500'
      case 'orange': return 'border-orange-500'
      case 'indigo': return 'border-indigo-500'
      case 'teal': return 'border-teal-500'
      case 'amber': return 'border-amber-500'
      case 'green': return 'border-green-600'
      case 'emerald': return 'border-emerald-600'
      case 'sky': return 'border-sky-500'
      case 'cyan': return 'border-cyan-500'
      case 'red': return 'border-red-500'
      default: return 'border-gray-300'
    }
  }

  const getSourceBadgeColor = (source) => {
    switch (source) {
      case 'Email': return 'bg-blue-100 text-blue-800'
      case 'API': return 'bg-green-100 text-green-800'
      case 'Manual': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLOBColor = (lob) => {
    switch (lob) {
      case 'Property': return 'bg-blue-600 text-white border-blue-700'
      case 'Casualty': return 'bg-orange-600 text-white border-orange-700'
      case 'Marine': return 'bg-cyan-600 text-white border-cyan-700'
      case 'Aviation': return 'bg-sky-600 text-white border-sky-700'
      case 'Energy': return 'bg-emerald-600 text-white border-emerald-700'
      case 'Cyber': return 'bg-purple-600 text-white border-purple-700'
      case 'Financial Institutions': return 'bg-indigo-600 text-white border-indigo-700'
      case 'Healthcare Liability': return 'bg-pink-600 text-white border-pink-700'
      case 'Life Sciences': return 'bg-teal-600 text-white border-teal-700'
      case 'Management Liability': return 'bg-red-600 text-white border-red-700'
      case 'Specialty': return 'bg-amber-600 text-white border-amber-700'
      case 'Surety': return 'bg-green-600 text-white border-green-700'
      case 'Agriculture': return 'bg-lime-600 text-white border-lime-700'
      case 'Environmental': return 'bg-green-700 text-white border-green-800'
      case 'Errors & Omissions / Professional Indemnity': return 'bg-violet-600 text-white border-violet-700'
      default: return 'bg-gray-600 text-white border-gray-700'
    }
  }

  const findContainer = (id) => {
    if (id in tasks) {
      return id
    }
    return Object.keys(tasks).find((key) => tasks[key].some(item => item.id === id))
  }

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return
    }

    setTasks((prev) => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]

      const activeIndex = activeItems.findIndex(item => item.id === activeId)
      const overIndex = overItems.findIndex(item => item.id === overId)

      let newIndex
      if (overId in prev) {
        newIndex = overItems.length + 1
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1
        const modifier = isBelowLastItem ? 1 : 0
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      return {
        ...prev,
        [activeContainer]: prev[activeContainer].filter(item => item.id !== activeId),
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          activeItems[activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      }
    })
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) {
      setActiveId(null)
      return
    }

    const activeId = active.id
    const overId = over.id

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer) {
      setActiveId(null)
      return
    }

    if (activeContainer === overContainer) {
      const activeIndex = tasks[activeContainer].findIndex(item => item.id === activeId)
      const overIndex = tasks[overContainer].findIndex(item => item.id === overId)

      if (activeIndex !== overIndex) {
        setTasks((prev) => ({
          ...prev,
          [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
        }))
      }
    }

    setActiveId(null)
  }

  const handleManualSubmission = (submission) => {
    console.log('New manual submission:', submission)
    // Add the new submission to the received column
    setTasks(prev => ({
      ...prev,
      received: [submission, ...prev.received]
    }))
    // Navigate to the risk detail page
    navigate(`/risk/${submission.id}`)
  }

  const handleStatusChange = (submissionId, newStatus) => {
    // Find which column the submission is currently in
    let currentColumn = null
    let submission = null

    for (const [columnId, items] of Object.entries(tasks)) {
      const found = items.find(item => item.id === submissionId)
      if (found) {
        currentColumn = columnId
        submission = found
        break
      }
    }

    if (!currentColumn || !submission) return

    // Move submission to new status column
    setTasks(prev => ({
      ...prev,
      [currentColumn]: prev[currentColumn].filter(item => item.id !== submissionId),
      [newStatus]: [...prev[newStatus], submission]
    }))
  }

  const currency = (n) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(n)
  }

  // Handle cell edit start
  const startEdit = (rowId, columnId, currentValue) => {
    setEditingCell({ rowId, columnId })
    setEditValue(currentValue || '')
  }

  // Handle cell edit save
  const saveEdit = () => {
    if (!editingCell) return

    const { rowId, columnId } = editingCell

    // Find and update the submission
    setTasks(prev => {
      const newTasks = { ...prev }
      for (const [status, items] of Object.entries(newTasks)) {
        const itemIndex = items.findIndex(item => item.id === rowId)
        if (itemIndex !== -1) {
          newTasks[status] = [...items]
          newTasks[status][itemIndex] = {
            ...newTasks[status][itemIndex],
            [columnId]: columnId === 'gwp' || columnId === 'limit' ? Number(editValue) || 0 : editValue
          }
          break
        }
      }
      return newTasks
    })

    setEditingCell(null)
    setEditValue('')
  }

  // Handle cell edit cancel
  const cancelEdit = () => {
    setEditingCell(null)
    setEditValue('')
  }

  // Handle column sort
  const handleSort = (columnId) => {
    if (sortBy === columnId) {
      // Toggle sort order if clicking same column
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new column and default to ascending
      setSortBy(columnId)
      setSortOrder('asc')
    }
  }

  // Handle column reordering
  const handleColumnDragEnd = (event) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    setVisibleColumns((columns) => {
      const oldIndex = columns.findIndex((col) => col.id === active.id)
      const newIndex = columns.findIndex((col) => col.id === over.id)

      return arrayMove(columns, oldIndex, newIndex)
    })
  }

  // Get all submissions in a flat array for spreadsheet view with sorting
  const getAllSubmissions = () => {
    let submissions = Object.entries(tasks).flatMap(([status, items]) =>
      items.map(item => ({ ...item, status }))
    )

    // Apply sorting
    submissions.sort((a, b) => {
      let aVal = a[sortBy]
      let bVal = b[sortBy]

      // Handle priority sorting
      if (sortBy === 'priority') {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 }
        aVal = priorityOrder[aVal] || 999
        bVal = priorityOrder[bVal] || 999
      }

      // Handle numeric fields
      if (sortBy === 'gwp' || sortBy === 'limit' || sortBy === 'deductible' || sortBy === 'age') {
        aVal = parseFloat(aVal) || 0
        bVal = parseFloat(bVal) || 0
      }

      // Handle string fields
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal ? bVal.toLowerCase() : ''
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return submissions
  }

  // Render cell content based on column type
  const renderCell = (submission, column) => {
    const isEditing = editingCell?.rowId === submission.id && editingCell?.columnId === column.id
    const columnId = column.id

    // If currently editing this cell, show input
    if (isEditing) {
      if (columnId === 'lob') {
        return (
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            autoFocus
            className="w-full px-2 py-1 text-sm border border-sompo-red rounded focus:outline-none focus:ring-2 focus:ring-sompo-red"
          >
            <option value="Property">Property</option>
            <option value="Casualty">Casualty</option>
            <option value="Marine">Marine</option>
            <option value="Aviation">Aviation</option>
            <option value="Energy">Energy</option>
            <option value="Cyber">Cyber</option>
            <option value="Financial Institutions">Financial Institutions</option>
            <option value="Healthcare Liability">Healthcare Liability</option>
            <option value="Life Sciences">Life Sciences</option>
          </select>
        )
      } else if (columnId === 'priority') {
        return (
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            autoFocus
            className="w-full px-2 py-1 text-sm border border-sompo-red rounded focus:outline-none focus:ring-2 focus:ring-sompo-red"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        )
      } else if (columnId === 'source') {
        return (
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            autoFocus
            className="w-full px-2 py-1 text-sm border border-sompo-red rounded focus:outline-none focus:ring-2 focus:ring-sompo-red"
          >
            <option value="Email">Email</option>
            <option value="API">API</option>
            <option value="Manual">Manual</option>
          </select>
        )
      } else if (columnId === 'newRenewal') {
        return (
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            autoFocus
            className="w-full px-2 py-1 text-sm border border-sompo-red rounded focus:outline-none focus:ring-2 focus:ring-sompo-red"
          >
            <option value="New">New</option>
            <option value="Renewal">Renewal</option>
          </select>
        )
      } else {
        return (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit()
              if (e.key === 'Escape') cancelEdit()
            }}
            autoFocus
            className="w-full px-2 py-1 text-sm border border-sompo-red rounded focus:outline-none focus:ring-2 focus:ring-sompo-red"
          />
        )
      }
    }

    // Otherwise show normal cell content with click to edit
    switch (columnId) {
      case 'id':
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/risk/${submission.id}`)}
              className="text-sompo-red hover:text-sompo-dark-red flex-shrink-0"
              title="Open risk detail"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <span className="font-medium text-gray-900">{submission.id}</span>
          </div>
        )
      case 'insured':
        return (
          <span
            className="text-gray-900 cursor-pointer hover:bg-gray-50 px-2 py-1 -mx-2 -my-1 rounded block"
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.insured)}
          >
            {submission.insured}
          </span>
        )
      case 'broker':
        return (
          <span
            className="text-gray-600 cursor-pointer hover:bg-gray-50 px-2 py-1 -mx-2 -my-1 rounded block"
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.broker)}
          >
            {submission.broker}
          </span>
        )
      case 'lob':
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold border-2 shadow-sm cursor-pointer hover:opacity-80 whitespace-nowrap ${getLOBColor(submission.lob)}`}
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.lob)}
          >
            {submission.lob}
          </span>
        )
      case 'gwp':
        return (
          <span
            className="font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 px-2 py-1 -mx-2 -my-1 rounded block"
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.gwp)}
          >
            {currency(submission.gwp)}
          </span>
        )
      case 'priority':
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 ${
              submission.priority === 'High' ? 'bg-sompo-red text-white' :
              submission.priority === 'Medium' ? 'bg-gray-600 text-white' :
              'bg-gray-400 text-white'
            }`}
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.priority)}
          >
            {submission.priority}
          </span>
        )
      case 'source':
        return (
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium cursor-pointer hover:opacity-80 ${getSourceBadgeColor(submission.source)}`}
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.source)}
          >
            {submission.source}
          </span>
        )
      case 'age':
        return <span className="text-gray-600">{submission.age}</span>
      case 'status':
        return (
          <select
            value={submission.status}
            onChange={(e) => handleStatusChange(submission.id, e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sompo-red cursor-pointer"
          >
            {columns.map(col => (
              <option key={col.id} value={col.id}>{col.title}</option>
            ))}
          </select>
        )
      case 'underwriter':
        return (
          <span
            className="text-gray-600 cursor-pointer hover:bg-gray-50 px-2 py-1 -mx-2 -my-1 rounded block"
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.underwriter)}
          >
            {submission.underwriter || '-'}
          </span>
        )
      case 'team':
        return (
          <span
            className="text-gray-600 cursor-pointer hover:bg-gray-50 px-2 py-1 -mx-2 -my-1 rounded block"
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.team)}
          >
            {submission.team || '-'}
          </span>
        )
      case 'inceptionDate':
        return (
          <span
            className="text-gray-600 cursor-pointer hover:bg-gray-50 px-2 py-1 -mx-2 -my-1 rounded block"
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.inceptionDate)}
          >
            {submission.inceptionDate || '-'}
          </span>
        )
      case 'limit':
        return (
          <span
            className="text-gray-900 cursor-pointer hover:bg-gray-50 px-2 py-1 -mx-2 -my-1 rounded block"
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.limit)}
          >
            {submission.limit ? currency(submission.limit) : '-'}
          </span>
        )
      case 'deductible':
        return (
          <span
            className="text-gray-600 cursor-pointer hover:bg-gray-50 px-2 py-1 -mx-2 -my-1 rounded block"
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.deductible)}
          >
            {submission.deductible ? currency(submission.deductible) : '-'}
          </span>
        )
      case 'coverage':
        return (
          <span
            className="text-gray-600 cursor-pointer hover:bg-gray-50 px-2 py-1 -mx-2 -my-1 rounded block"
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.coverage)}
          >
            {submission.coverage || '-'}
          </span>
        )
      case 'placementType':
        return (
          <span
            className="text-gray-600 cursor-pointer hover:bg-gray-50 px-2 py-1 -mx-2 -my-1 rounded block"
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.placementType)}
          >
            {submission.placementType || '-'}
          </span>
        )
      case 'newRenewal':
        return (
          <span
            className="text-gray-600 cursor-pointer hover:bg-gray-50 px-2 py-1 -mx-2 -my-1 rounded block"
            onClick={() => column.editable && startEdit(submission.id, columnId, submission.newRenewal)}
          >
            {submission.newRenewal || '-'}
          </span>
        )
      default:
        return '-'
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1680px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold gradient-text mb-6">Work Queue</h1>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      viewMode === 'kanban'
                        ? 'bg-white text-sompo-red shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Kanban
                  </button>
                  <button
                    onClick={() => setViewMode('spreadsheet')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      viewMode === 'spreadsheet'
                        ? 'bg-white text-sompo-red shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <TableIcon className="w-4 h-4" />
                    Spreadsheet
                  </button>
                </div>

                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search submissions..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red focus:border-sompo-red"
                    />
                  </div>
                </div>

                {/* LoB Filter */}
                <select
                  value={filters.lob}
                  onChange={(e) => setFilters({...filters, lob: e.target.value})}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                >
                  <option value="All">All LoB</option>
                  <option value="Property">Property</option>
                  <option value="Casualty">Casualty</option>
                  <option value="Marine">Marine</option>
                  <option value="Aviation">Aviation</option>
                  <option value="Energy">Energy</option>
                  <option value="Cyber">Cyber</option>
                  <option value="Financial Institutions">Financial Institutions</option>
                  <option value="Healthcare Liability">Healthcare Liability</option>
                  <option value="Life Sciences">Life Sciences</option>
                </select>

                {/* Source Filter */}
                <select
                  value={filters.source}
                  onChange={(e) => setFilters({...filters, source: e.target.value})}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                >
                  <option value="All">All Sources</option>
                  <option value="Email">Email</option>
                  <option value="API">API</option>
                  <option value="Manual">Manual</option>
                </select>

                {/* Priority Filter */}
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({...filters, priority: e.target.value})}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                >
                  <option value="All">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-sompo-red text-white hover:bg-sompo-dark-red flex items-center gap-2"
                >
                  Add Submission
                </button>
              </div>
            </div>
          </motion.div>

          {/* Spreadsheet View */}
          {viewMode === 'spreadsheet' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Spreadsheet Toolbar */}
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <select
                    value={currentView}
                    onChange={(e) => loadView(e.target.value)}
                    className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sompo-red"
                  >
                    {savedViews.map(view => (
                      <option key={view.id} value={view.id}>{view.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowSaveView(true)}
                    className="text-sm px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    Save View
                  </button>
                </div>
                <button
                  onClick={() => setShowColumnSettings(true)}
                  className="text-sm px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center gap-1.5"
                >
                  <Settings className="w-4 h-4" />
                  Columns ({visibleColumns.filter(c => c.enabled).length})
                </button>
              </div>

              <div className="overflow-x-auto">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCorners}
                  onDragEnd={handleColumnDragEnd}
                >
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <SortableContext
                          items={visibleColumns.filter(col => col.enabled).map(col => col.id)}
                          strategy={horizontalListSortingStrategy}
                        >
                          {visibleColumns.filter(col => col.enabled).map(col => (
                            <SortableTableHeader
                              key={col.id}
                              column={col}
                              sortBy={sortBy}
                              sortOrder={sortOrder}
                              onClick={handleSort}
                            />
                          ))}
                        </SortableContext>
                      </tr>
                    </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getAllSubmissions().map((submission) => (
                      <tr
                        key={submission.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {visibleColumns.filter(col => col.enabled).map(col => (
                          <td key={col.id} className="px-4 py-3 text-sm">
                            {renderCell(submission, col)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                </DndContext>
              </div>

              {getAllSubmissions().length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No submissions found
                </div>
              )}
            </motion.div>
          )}

          {/* Kanban Board with Drag & Drop */}
          {viewMode === 'kanban' && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="overflow-x-auto pb-4">
              <div className="inline-flex gap-4 min-w-full">
              {columns.map((column, colIdx) => (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: colIdx * 0.05 }}
                  className={`bg-white rounded-lg shadow-lg border-t-4 ${getColumnColor(column.color)} overflow-hidden min-h-[500px] flex flex-col w-64 flex-shrink-0`}
                >
                  {/* Column Header */}
                  <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{column.icon}</span>
                        <h3 className="font-semibold text-gray-900 text-sm">{column.title}</h3>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                        {tasks[column.id].length}
                      </span>
                    </div>
                  </div>

                  {/* Sortable Column Body */}
                  <SortableContext
                    items={tasks[column.id].map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <DroppableColumn id={column.id}>
                      {tasks[column.id].map((task) => (
                        <SortableRiskCard
                          key={task.id}
                          task={task}
                          onClick={() => navigate(`/risk/${task.id}`)}
                          getSourceBadgeColor={getSourceBadgeColor}
                          getLOBColor={getLOBColor}
                        />
                      ))}

                      {tasks[column.id].length === 0 && (
                        <div className="text-center py-12 text-gray-400 text-sm italic">
                          Drop submissions here
                        </div>
                      )}
                    </DroppableColumn>
                  </SortableContext>
                </motion.div>
              ))}
              </div>
            </div>

            <DragOverlay>
              {activeId ? (
                <div className="bg-white border-2 border-sompo-red rounded-lg p-4 shadow-2xl opacity-90 rotate-3">
                  <div className="font-medium text-gray-900">
                    {Object.values(tasks).flat().find(t => t.id === activeId)?.insured || 'Dragging...'}
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
          )}
        </div>
      </div>

      {/* Manual Submission Modal */}
      <ManualSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleManualSubmission}
      />

      {/* Column Settings Modal */}
      {showColumnSettings && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setShowColumnSettings(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
            >
              <div className="bg-gradient-to-r from-sompo-red to-sompo-dark-red text-white px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Column Settings</h3>
                <button
                  onClick={() => setShowColumnSettings(false)}
                  className="text-white hover:bg-white/20 rounded-full p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                <p className="text-sm text-gray-600 mb-4">
                  Toggle columns to show or hide in the spreadsheet view
                </p>
                <div className="space-y-2">
                  {visibleColumns.map(col => (
                    <label
                      key={col.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={col.enabled}
                        onChange={() => toggleColumn(col.id)}
                        className="w-4 h-4 text-sompo-red focus:ring-sompo-red rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">{col.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowColumnSettings(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}

      {/* Save View Modal */}
      {showSaveView && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setShowSaveView(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full"
            >
              <div className="bg-gradient-to-r from-sompo-red to-sompo-dark-red text-white px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Save View</h3>
                <button
                  onClick={() => setShowSaveView(false)}
                  className="text-white hover:bg-white/20 rounded-full p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  View Name
                </label>
                <input
                  type="text"
                  value={viewName}
                  onChange={(e) => setViewName(e.target.value)}
                  placeholder="e.g., My Custom View"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sompo-red"
                  onKeyPress={(e) => e.key === 'Enter' && saveView()}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Save current column configuration as a named view
                </p>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowSaveView(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveView}
                  className="px-4 py-2 bg-sompo-red text-white rounded-lg hover:bg-sompo-dark-red flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save View
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </PageTransition>
  )
}

export default WorkQueue
