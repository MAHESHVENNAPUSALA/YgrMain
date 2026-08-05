import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../shared/context/AuthContext';
import { useToast } from '../../shared/context/ToastContext';
import { useDialog } from '../../shared/context/DialogContext';
import projectsApi from '../../services/api/projects';
import api from '../../services/api';

const Projects = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { confirm: showConfirm, prompt: showPrompt } = useDialog();
  const role = user?.role;

  // Tabs: 'dashboard' | 'projects' | 'reports' | 'notifications'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // Core Data
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [reportsData, setReportsData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);

  // Detail Sub-tabs: 'info' | 'teams' | 'documents' | 'comments' | 'activity'
  const [detailTab, setDetailTab] = useState('info');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [managerFilter, setManagerFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modals / Forms Open States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedTeamForMember, setSelectedTeamForMember] = useState(null);

  // Forms State
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    client_name: '',
    client_contact: '',
    client: '',
    project_category: '',
    priority: 'Medium',
    start_date: '',
    end_date: '',
    estimated_budget: '',
    technology_stack: '',
    project_color: '#3b82f6',
    assigned_manager: ''
  });
  const [logoFile, setLogoFile] = useState(null);

  const [teamForm, setTeamForm] = useState({
    name: '',
    lead: '',
    department: 'python_dev',
    description: '',
    max_size: 10
  });

  const [newComment, setNewComment] = useState('');
  const [uploadDocFile, setUploadDocFile] = useState(null);
  const [uploadDocName, setUploadDocName] = useState('');

  // Fetch initial data
  const loadDashboard = async () => {
    try {
      const res = await projectsApi.getDashboard();
      setDashboardData(res.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  const loadProjects = async () => {
    try {
      const params = {
        search: searchQuery,
        status: statusFilter,
        priority: priorityFilter,
        manager_id: managerFilter,
        client_name: clientFilter,
        category: categoryFilter
      };
      const res = await projectsApi.getProjects(params);
      setProjects(res.data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      showToast('Failed to load projects list.', 'error');
    }
  };

  const loadNotifications = async () => {
    try {
      const res = await projectsApi.getNotifications();
      setNotifications(res.data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const loadUsersAndResources = async () => {
    try {
      // Load all users from messaging users list
      const usersRes = await api.get('/api/users/');
      setUsers(usersRes.data || []);

      // Load clients
      const clientsRes = await api.get('/api/invoicing-resources/');
      setClients(clientsRes.data?.clients || []);
    } catch (err) {
      console.error('Error fetching users and clients:', err);
    }
  };

  const loadReports = async () => {
    if (['HR', 'MD', 'Manager'].includes(role)) {
      try {
        const res = await projectsApi.getReports();
        setReportsData(res.data);
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    }
  };

  const initData = async () => {
    setLoading(true);
    await Promise.all([
      loadDashboard(),
      loadProjects(),
      loadNotifications(),
      loadUsersAndResources(),
      loadReports()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, [searchQuery, statusFilter, priorityFilter, managerFilter, clientFilter, categoryFilter]);

  // Project details loading
  const handleViewDetails = async (proj) => {
    try {
      setLoading(true);
      const res = await projectsApi.getProjectDetail(proj.id);
      setSelectedProject(res.data);
      setDetailTab('info');
    } catch (err) {
      console.error('Error loading project details:', err);
      showToast('Failed to load project details.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const refreshProjectDetails = async () => {
    if (!selectedProject) return;
    try {
      const res = await projectsApi.getProjectDetail(selectedProject.id);
      setSelectedProject(res.data);
    } catch (err) {
      console.error('Error refreshing project details:', err);
    }
  };

  // Managers List filter
  const managers = useMemo(() => users.filter(u => u.role === 'Manager'), [users]);
  const teamLeads = useMemo(() => users.filter(u => u.role === 'TeamLead'), [users]);
  const employeesList = useMemo(() => users.filter(u => u.role === 'Employee'), [users]);

  // Project Creation Submit
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectForm.name) {
      showToast('Project Name is required.', 'warning');
      return;
    }

    const data = new FormData();
    Object.keys(projectForm).forEach(key => {
      data.append(key, projectForm[key]);
    });
    if (logoFile) {
      data.append('project_logo', logoFile);
    }

    try {
      await projectsApi.createProject(data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      showToast('Project created successfully!', 'success');
      setIsCreateOpen(false);
      setProjectForm({
        name: '',
        description: '',
        client_name: '',
        client_contact: '',
        client: '',
        project_category: '',
        priority: 'Medium',
        start_date: '',
        end_date: '',
        estimated_budget: '',
        technology_stack: '',
        project_color: '#3b82f6',
        assigned_manager: ''
      });
      setLogoFile(null);
      initData();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to create project.', 'error');
    }
  };

  // Project Edit Submit
  const handleEditProject = async (e) => {
    e.preventDefault();
    if (!projectForm.name) {
      showToast('Project Name is required.', 'warning');
      return;
    }

    const data = new FormData();
    Object.keys(projectForm).forEach(key => {
      data.append(key, projectForm[key]);
    });
    if (logoFile) {
      data.append('project_logo', logoFile);
    }

    try {
      await projectsApi.updateProject(selectedProject.id, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      showToast('Project details updated successfully!', 'success');
      setIsEditOpen(false);
      setLogoFile(null);
      await refreshProjectDetails();
      await loadProjects();
      await loadDashboard();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update project.', 'error');
    }
  };

  const handleOpenEditModal = () => {
    if (!selectedProject) return;
    setProjectForm({
      name: selectedProject.name,
      description: selectedProject.description || '',
      client_name: selectedProject.client_name || '',
      client_contact: selectedProject.client_contact || '',
      client: selectedProject.client || '',
      project_category: selectedProject.project_category || '',
      priority: selectedProject.priority || 'Medium',
      start_date: selectedProject.startdate || '',
      end_date: selectedProject.deadline || '',
      estimated_budget: selectedProject.estimated_budget || '',
      technology_stack: selectedProject.technology_stack || '',
      project_color: selectedProject.project_color || '#3b82f6',
      assigned_manager: selectedProject.assigned_manager || '',
      status: selectedProject.status || 'Pending'
    });
    setIsEditOpen(true);
  };

  // Archive Project Toggle
  const handleArchiveToggle = async () => {
    if (!selectedProject) return;
    const actionText = selectedProject.is_archived ? 'unarchive' : 'archive';
    const isConfirmed = await showConfirm(`Are you sure you want to ${actionText} this project?`);
    if (!isConfirmed) return;

    try {
      const res = await projectsApi.archiveProject(selectedProject.id, !selectedProject.is_archived);
      showToast(`Project has been ${actionText}d successfully.`, 'success');
      setSelectedProject(prev => prev ? { ...prev, is_archived: res.data.is_archived, status: res.data.is_archived ? 'Archived' : 'Active' } : null);
      loadProjects();
      loadDashboard();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to toggle archive status.', 'error');
    }
  };

  // MD Manager Transfer
  const handleTransferManager = async () => {
    if (!selectedProject) return;
    const managers = allUsers.filter(u => u.role === 'Manager');
    if (managers.length === 0) {
      showToast('No managers available in the system.', 'warning');
      return;
    }

    const mgrOpts = managers.map(m => `ID: ${m.id} - ${m.name}`).join('\n');
    const input = await showPrompt(`Transfer project to a new Manager. Available Managers:\n${mgrOpts}\n\nEnter the Manager's ID:`);
    if (input === null || input.trim() === '') return;

    const managerId = parseInt(input.trim());
    if (isNaN(managerId)) {
      showToast('Please enter a valid numeric ID.', 'warning');
      return;
    }

    try {
      await projectsApi.transferProject(selectedProject.id, managerId);
      showToast('Project transferred successfully.', 'success');
      await refreshProjectDetails();
      await loadProjects();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to transfer project.', 'error');
    }
  };

  const handleProjectReview = async (actionStr) => {
    try {
      await api.post(`/api/projects/${selectedProject.id}/review/`, { action: actionStr, remarks: 'Reviewed from workspace' });
      showToast('Project review processed successfully.', 'success');
      loadData();
      setSelectedProject(null);
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to process project review.', 'error');
    }
  };

  // Delete Project
  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    const isConfirmed = await showConfirm('WARNING: Are you sure you want to permanently delete this project? This will remove all teams, members, comments, and files!');
    if (!isConfirmed) return;

    try {
      await projectsApi.deleteProject(selectedProject.id);
      showToast('Project deleted successfully.', 'success');
      setSelectedProject(null);
      initData();
    } catch (err) {
      showToast('Failed to delete project.', 'error');
    }
  };

  // Create Team
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamForm.name) {
      showToast('Team Name is required.', 'warning');
      return;
    }

    try {
      await projectsApi.createTeam(selectedProject.id, teamForm);
      showToast('Team created successfully!', 'success');
      setIsCreateTeamOpen(false);
      setTeamForm({
        name: '',
        lead: '',
        department: 'python_dev',
        description: '',
        max_size: 10
      });
      await refreshProjectDetails();
      await loadDashboard();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to create team.', 'error');
    }
  };

  // Delete Team
  const handleDeleteTeam = async (teamId) => {
    const isConfirmed = await showConfirm('Are you sure you want to delete this team?');
    if (!isConfirmed) return;

    try {
      await projectsApi.deleteTeam(teamId);
      showToast('Team deleted successfully.', 'success');
      await refreshProjectDetails();
      await loadDashboard();
    } catch (err) {
      showToast('Failed to delete team.', 'error');
    }
  };

  // Assign Team Lead
  const handleQuickAssignTL = async (team) => {
    const tlOpts = teamLeads.map(t => `${t.id}: ${t.name || t.username}`).join('\n');
    const input = await showPrompt(`Assign Team Leader to '${team.name}'. Available Leads:\n${tlOpts}\n\nEnter Lead User ID (or leave blank to remove):`);
    if (input === null) return;

    const leadId = input.trim() === '' ? null : parseInt(input.trim());
    if (leadId !== null && isNaN(leadId)) {
      showToast('Please enter a valid numeric ID.', 'warning');
      return;
    }

    try {
      await projectsApi.updateTeam(team.id, { lead: leadId });
      showToast('Team Leader updated successfully.', 'success');
      await refreshProjectDetails();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to update Team Leader.', 'error');
    }
  };

  // Add Member
  const handleAddMember = async (empId) => {
    if (!selectedTeamForMember) return;
    try {
      await projectsApi.addTeamMember(selectedTeamForMember.id, empId);
      showToast('Employee assigned to team successfully.', 'success');
      setIsAddMemberOpen(false);
      setSelectedTeamForMember(null);
      await refreshProjectDetails();
      await loadDashboard();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to assign employee.', 'error');
    }
  };

  // Remove Member
  const handleRemoveMember = async (teamId, empId, empName) => {
    const isConfirmed = await showConfirm(`Are you sure you want to remove ${empName} from this team?`);
    if (!isConfirmed) return;

    try {
      await projectsApi.removeTeamMember(teamId, empId);
      showToast('Employee removed from team.', 'success');
      await refreshProjectDetails();
      await loadDashboard();
    } catch (err) {
      showToast('Failed to remove employee.', 'error');
    }
  };

  // Comments
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await projectsApi.addComment(selectedProject.id, newComment);
      setNewComment('');
      await refreshProjectDetails();
    } catch (err) {
      showToast('Failed to post comment.', 'error');
    }
  };

  // File upload
  const handleUploadDocument = async (e) => {
    e.preventDefault();
    if (!uploadDocFile) {
      showToast('Please select a file to upload.', 'warning');
      return;
    }

    const data = new FormData();
    data.append('file', uploadDocFile);
    data.append('name', uploadDocName || uploadDocFile.name);

    try {
      await projectsApi.uploadDocument(selectedProject.id, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      showToast('Document uploaded successfully.', 'success');
      setUploadDocFile(null);
      setUploadDocName('');
      await refreshProjectDetails();
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to upload document.', 'error');
    }
  };

  // PDF / Excel exports
  const handleExport = async (format) => {
    try {
      showToast(`Generating ${format.toUpperCase()} report...`, 'info');
      const res = await api.get('/api/projects/reports/', {
        params: { export: format },
        responseType: 'blob'
      });

      const file = new Blob([res.data], {
        type: format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', `Enterprise_Project_Management_Report.${format === 'pdf' ? 'pdf' : 'xlsx'}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      showToast('Report downloaded successfully.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to export report.', 'error');
    }
  };

  // Notifications
  const handleMarkNotificationRead = async (id, markAll = false) => {
    try {
      const payload = markAll ? { mark_all: true } : { id };
      await projectsApi.markNotificationRead(payload);
      await loadNotifications();
      if (markAll) {
        showToast('All notifications marked as read.', 'success');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Department option displays
  const departmentOptions = [
    { value: 'python_dev', label: 'Python Developer' },
    { value: 'java_dev', label: 'Java Developer' },
    { value: 'frontend_dev', label: 'Front-End Developer' },
    { value: 'backend_dev', label: 'Back-End Developer' },
    { value: 'fullstack_dev', label: 'Full Stack Developer' },
    { value: 'testing', label: 'Testing / QA' },
    { value: 'devops', label: 'DevOps Engineer' },
    { value: 'data_analyst', label: 'Data Analyst' },
    { value: 'data_scientist', label: 'Data Scientist' },
    { value: 'ai_ml', label: 'AI / ML Engineer' },
    { value: 'cyber_security', label: 'Cyber Security' },
    { value: 'cloud_engineer', label: 'Cloud Engineer' },
    { value: 'ui_ux', label: 'UI / UX Designer' },
    { value: 'mobile_dev', label: 'Mobile App Developer' }
  ];

  if (loading && !selectedProject && projects.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', color: 'var(--muted)' }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginRight: '10px' }}></i> Loading Enterprise Projects Module...
      </div>
    );
  }

  return (
    <div className="projects-workspace-container">
      <style>{`
        .projects-workspace-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 8px 0;
        }
        .projects-tab-nav {
          display: flex;
          gap: 12px;
          border-bottom: 2px solid var(--border);
          padding-bottom: 8px;
        }
        .projects-tab-nav button {
          background: none;
          border: none;
          padding: 10px 20px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 15px;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 8px;
          transition: var(--transition-base);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .projects-tab-nav button:hover {
          background: var(--bg-surface);
          color: var(--text-primary);
        }
        .projects-tab-nav button.active {
          background: var(--primary-color);
          color: #ffffff;
        }
        .notifications-badge {
          background: var(--danger);
          color: #ffffff;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 800;
        }

        /* Dashboard view elements */
        .projects-dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .stat-project-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--card-shadow);
        }
        .stat-project-card .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #ffffff;
        }
        .stat-project-card .stat-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .stat-project-card .stat-count {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }
        .stat-project-card .stat-label {
          font-size: 13px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        /* Dashboard row 2 */
        .dashboard-row-two {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .dashboard-row-two {
            grid-template-columns: 1fr;
          }
        }

        /* Filter block */
        .workspace-filter-bar {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 16px 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
        }
        .workspace-filter-bar .search-wrapper {
          flex: 1;
          min-width: 200px;
          position: relative;
        }
        .workspace-filter-bar .search-wrapper input {
          width: 100%;
          padding: 10px 16px 10px 38px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-base);
          color: var(--text-primary);
        }
        .workspace-filter-bar .search-wrapper i {
          position: absolute;
          left: 14px;
          top: 14px;
          color: var(--muted);
        }
        .workspace-filter-bar select {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-base);
          color: var(--text-primary);
          min-width: 130px;
        }

        /* Projects List Workspace */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .project-grid-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--card-shadow);
          transition: var(--transition-base);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          text-align: left;
          position: relative;
        }
        .project-grid-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }
        .project-card-header {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
        }
        .project-logo-badge {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #ffffff;
          font-size: 16px;
        }
        .project-card-body {
          padding: 18px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .project-card-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          color: var(--text-primary);
        }
        .project-card-desc {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .project-card-meta {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--muted);
          border-top: 1px solid var(--border);
          padding-top: 10px;
        }

        /* Detail split layout */
        .project-details-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .project-details-layout {
            grid-template-columns: 1fr;
          }
        }
        .project-details-sidebar {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .project-details-body {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Modals and Overlays */
        .projects-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(4px);
        }
        .projects-modal {
          background: var(--bg-surface);
          border-radius: var(--border-radius);
          width: 90%;
          max-width: 600px;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
        }
        .projects-modal-header {
          padding: 16px 24px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .projects-modal-header h3 {
          font-family: var(--font-display);
          font-weight: 700;
          margin: 0;
        }
        .projects-modal-close {
          background: none;
          border: none;
          font-size: 18px;
          color: var(--muted);
          cursor: pointer;
        }
        .projects-modal-body {
          padding: 24px;
          text-align: left;
        }
        .project-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) {
          .project-form-grid {
            grid-template-columns: 1fr;
          }
        }
        .form-group-full {
          grid-column: 1 / -1;
        }
        .projects-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }
        .projects-form-group label {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .projects-form-group input, .projects-form-group select, .projects-form-group textarea {
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-base);
          color: var(--text-primary);
        }
        .projects-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        .projects-btn {
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          border: none;
          transition: var(--transition-base);
        }
        .projects-btn-primary {
          background: var(--primary-color);
          color: #ffffff;
        }
        .projects-btn-primary:hover {
          background: var(--primary-light);
        }
        .projects-btn-secondary {
          background: var(--bg-base);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }
        .projects-btn-secondary:hover {
          background: var(--border);
        }
        .projects-btn-danger {
          background: var(--danger);
          color: #ffffff;
        }
        .projects-btn-danger:hover {
          background: #b91c1c;
        }

        /* Detail view subtabs */
        .detail-tabs {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 16px;
        }
        .detail-tabs button {
          background: none;
          border: none;
          padding: 8px 16px;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 13.5px;
          border-bottom: 2px solid transparent;
        }
        .detail-tabs button.active {
          color: var(--accent-blue);
          border-bottom-color: var(--accent-blue);
        }

        /* Comment block */
        .comments-feed {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 16px;
          padding-right: 8px;
        }
        .comment-item {
          display: flex;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
          text-align: left;
        }
        .comment-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent-blue);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          flex-shrink: 0;
        }
        .comment-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .comment-header {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .comment-author {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .comment-time {
          font-size: 11px;
          color: var(--muted);
        }
        .comment-text {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.4;
        }

        /* Activity Log List */
        .activity-log-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 300px;
          overflow-y: auto;
        }
        .activity-log-item {
          display: flex;
          gap: 12px;
          font-size: 13px;
          text-align: left;
          padding: 8px;
          border-radius: 6px;
          background: var(--bg-base);
          align-items: center;
        }
        .activity-log-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: var(--text-secondary);
        }

        /* Notifications list */
        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .notification-item {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--border-radius);
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          position: relative;
        }
        .notification-item.unread {
          border-left: 4px solid var(--accent-blue);
          background: rgba(59, 130, 246, 0.02);
        }
        .notification-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .notification-title {
          font-weight: 700;
          color: var(--text-primary);
          font-size: 14px;
        }
        .notification-desc {
          color: var(--text-secondary);
          font-size: 13px;
        }
        .notification-time {
          font-size: 11px;
          color: var(--muted);
        }
      `}</style>

      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: 'var(--primary-color)', fontFamily: 'var(--font-display)', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>
          Enterprise Project Management
        </h2>
        {role === 'HR' && (
          <button className="projects-btn projects-btn-primary" onClick={() => setIsCreateOpen(true)} id="btnCreateProject">
            <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i> Create Project
          </button>
        )}
      </div>

      {/* TAB NAVIGATION */}
      <div className="projects-tab-nav">
        <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => { setActiveTab('dashboard'); setSelectedProject(null); }}>
          <i className="fa-solid fa-chart-line"></i> Dashboard
        </button>
        <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => loadProjects().then(() => setActiveTab('projects'))} id="tabProjectsWorkspace">
          <i className="fa-solid fa-folder-tree"></i> Project Workspace
        </button>
        {['HR', 'MD', 'Manager'].includes(role) && (
          <button className={activeTab === 'reports' ? 'active' : ''} onClick={() => { setActiveTab('reports'); setSelectedProject(null); }}>
            <i className="fa-solid fa-file-invoice"></i> Reports Center
          </button>
        )}
        <button className={activeTab === 'notifications' ? 'active' : ''} onClick={() => { setActiveTab('notifications'); setSelectedProject(null); }}>
          <i className="fa-solid fa-bell"></i> Notifications {notifications.filter(n => !n.is_read).length > 0 && (
            <span className="notifications-badge">{notifications.filter(n => !n.is_read).length}</span>
          )}
        </button>
      </div>

      {/* DASHBOARD TAB VIEW */}
      {activeTab === 'dashboard' && dashboardData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Stats Cards */}
          <div className="projects-dashboard-grid">
            <div className="stat-project-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
                <i className="fa-solid fa-folder"></i>
              </div>
              <div className="stat-info">
                <span className="stat-count">{dashboardData.total_projects}</span>
                <span className="stat-label">Total Projects</span>
              </div>
            </div>
            <div className="stat-project-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' }}>
                <i className="fa-solid fa-spinner fa-spin"></i>
              </div>
              <div className="stat-info">
                <span className="stat-count">{dashboardData.active_projects}</span>
                <span className="stat-label">Active Projects</span>
              </div>
            </div>
            <div className="stat-project-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)' }}>
                <i className="fa-solid fa-users-gear"></i>
              </div>
              <div className="stat-info">
                <span className="stat-count">{dashboardData.total_teams}</span>
                <span className="stat-label">Total Teams</span>
              </div>
            </div>
            <div className="stat-project-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' }}>
                <i className="fa-solid fa-users"></i>
              </div>
              <div className="stat-info">
                <span className="stat-count">{dashboardData.total_employees}</span>
                <span className="stat-label">Allocated Employees</span>
              </div>
            </div>
          </div>

          {/* Sub Row: Progress List and Teams Performance */}
          <div className="dashboard-row-two">
            {/* Progress list */}
            <div className="dashboard-panel-card" style={{ margin: 0 }}>
              <div className="panel-header">
                <h2><i className="fa-solid fa-chart-bar" style={{ color: 'var(--accent-blue)' }}></i> Project Progress Tracker</h2>
              </div>
              <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {dashboardData.project_progress?.length === 0 ? (
                  <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No active projects found.</p>
                ) : (
                  dashboardData.project_progress?.map(proj => (
                    <div key={proj.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ fontWeight: 700 }}>{proj.project_code} - {proj.name}</span>
                        <span style={{ color: 'var(--muted)', fontWeight: 800 }}>{proj.progress}%</span>
                      </div>
                      <div style={{ background: 'var(--bg-base)', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                        <div style={{ background: proj.color || 'var(--accent-blue)', height: '100%', width: `${proj.progress}%`, transition: 'width 0.4s ease' }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Performance + Deadlines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="dashboard-panel-card" style={{ margin: 0 }}>
                <div className="panel-header">
                  <h2><i className="fa-solid fa-clock-rotate-left" style={{ color: 'var(--warning)' }}></i> Upcoming Deadlines</h2>
                </div>
                <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {dashboardData.upcoming_deadlines?.length === 0 ? (
                    <p style={{ color: 'var(--muted)', fontSize: '13px' }}>No upcoming deadlines in 30 days.</p>
                  ) : (
                    dashboardData.upcoming_deadlines?.map(up => (
                      <div key={up.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px', fontSize: '13px', textAlign: 'left' }}>
                        <div>
                          <div style={{ fontWeight: 700 }}>{up.project_name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Code: {up.project_code}</div>
                        </div>
                        <span style={{ color: 'var(--danger)', fontWeight: 700 }}>{up.deadline}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Recent activities */}
              <div className="dashboard-panel-card" style={{ margin: 0 }}>
                <div className="panel-header">
                  <h2><i className="fa-solid fa-list-check" style={{ color: 'var(--success)' }}></i> Recent Activities</h2>
                </div>
                <div className="panel-body">
                  <div className="activity-log-list">
                    {dashboardData.recent_activities?.length === 0 ? (
                      <p style={{ color: 'var(--muted)', fontSize: '13px' }}>No recent activity records.</p>
                    ) : (
                      dashboardData.recent_activities?.map(act => (
                        <div key={act.id} className="activity-log-item">
                          <div className="activity-log-icon"><i className="fa-solid fa-info"></i></div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '12.5px' }}>{act.action}</div>
                            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{act.details}</div>
                            <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{act.user_name} • {new Date(act.timestamp).toLocaleTimeString()}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROJECTS LIST TAB VIEW */}
      {activeTab === 'projects' && !selectedProject && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Filters */}
          <div className="workspace-filter-bar">
            <div className="search-wrapper">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search projects by name, code or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="inpSearchProjects"
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} id="selFilterStatus">
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Delayed">Delayed</option>
              <option value="Archived">Archived</option>
            </select>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            <select value={managerFilter} onChange={(e) => setManagerFilter(e.target.value)}>
              <option value="">All Managers</option>
              {managers.map(m => (
                <option key={m.id} value={m.id}>{m.name || m.username}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Client Name..."
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-base)', color: 'var(--text-primary)', maxWidth: '140px' }}
            />
          </div>

          {/* Grid List */}
          {projects.length === 0 ? (
            <div className="dashboard-panel-card" style={{ padding: '40px', color: 'var(--muted)', fontSize: '15px' }}>
              <i className="fa-solid fa-folder-open" style={{ fontSize: '3rem', display: 'block', marginBottom: '10px' }}></i> No projects match your search filters.
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map(proj => (
                <div key={proj.id} className="project-grid-card" onClick={() => handleViewDetails(proj)} id={`projectCard-${proj.project_code}`}>
                  <div className="project-card-header">
                    <span className="badge-capsule" style={{ background: `${proj.project_color}15`, color: proj.project_color }}>
                      {proj.project_code || proj.project_id}
                    </span>
                    <span className={`badge-capsule badge-${proj.status?.toLowerCase()}`} style={{
                      background: proj.status === 'Active' ? '#d1fae5' : proj.status === 'Completed' ? '#dbeafe' : proj.status === 'Delayed' ? '#fee2e2' : '#fef3c7',
                      color: proj.status === 'Active' ? '#065f46' : proj.status === 'Completed' ? '#1e40af' : proj.status === 'Delayed' ? '#991b1b' : '#92400e',
                    }}>
                      {proj.status}
                    </span>
                  </div>
                  <div className="project-card-body">
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div className="project-logo-badge" style={{ backgroundColor: proj.project_color || '#3b82f6' }}>
                        {proj.name?.substring(0, 2).toUpperCase()}
                      </div>
                      <h4 className="project-card-title">{proj.name}</h4>
                    </div>
                    <p className="project-card-desc">{proj.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)', marginTop: 'auto' }}>
                      <span>Priority: <b>{proj.priority}</b></span>
                      <span>• Manager: <b>{proj.assigned_manager_name || 'None'}</b></span>
                    </div>
                  </div>
                  <div className="project-card-meta">
                    <span>Deadline: {proj.deadline || 'N/A'}</span>
                    <span>Teams: {proj.teams_count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PROJECT DETAILS VIEW MODE */}
      {activeTab === 'projects' && selectedProject && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Back Action Bar */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
            <button className="projects-btn projects-btn-secondary" onClick={() => setSelectedProject(null)} id="btnBackToWorkspace">
              <i className="fa-solid fa-arrow-left"></i> Back to Workspace
            </button>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['HR', 'MD'].includes(role) && (
                <>
                  <button className="projects-btn projects-btn-secondary" onClick={handleOpenEditModal} id="btnEditProject">
                    <i className="fa-solid fa-edit"></i> Edit Details
                  </button>
                  <button className="projects-btn projects-btn-danger" onClick={handleDeleteProject}>
                    <i className="fa-solid fa-trash"></i> Delete
                  </button>
                </>
              )}
              {role === 'TeamLead' && (
                  <button className="projects-btn projects-btn-primary" onClick={() => handleProjectReview('submit')} style={{ background: '#10b981', borderColor: '#10b981' }}>
                    <i className="fa-solid fa-check"></i> Submit Project Report
                  </button>
              )}
              {role === 'Manager' && (
                  <button className="projects-btn projects-btn-primary" onClick={() => handleProjectReview('submit')} style={{ background: '#10b981', borderColor: '#10b981' }}>
                    <i className="fa-solid fa-check"></i> Submit to HR
                  </button>
              )}
              {role === 'HR' && (
                  <button className="projects-btn projects-btn-primary" onClick={() => handleProjectReview('submit')} style={{ background: '#10b981', borderColor: '#10b981' }}>
                    <i className="fa-solid fa-check"></i> Submit to MD
                  </button>
              )}
              {role === 'MD' && (
                  <button className="projects-btn projects-btn-primary" onClick={() => handleProjectReview('submit')} style={{ background: '#10b981', borderColor: '#10b981' }}>
                    <i className="fa-solid fa-check"></i> Finalize Project
                  </button>
              )}
              {role === 'MD' && (
                <>
                  <button className="projects-btn projects-btn-secondary" onClick={handleTransferManager} style={{ background: '#fef3c7', borderColor: '#f59e0b', color: '#92400e' }} id="btnTransferProject">
                    <i className="fa-solid fa-exchange-alt"></i> Transfer Manager
                  </button>
                  <button className="projects-btn projects-btn-secondary" onClick={handleArchiveToggle} style={{ background: selectedProject.is_archived ? '#d1fae5' : '#fee2e2', borderColor: selectedProject.is_archived ? '#10b981' : '#ef4444', color: selectedProject.is_archived ? '#065f46' : '#991b1b' }}>
                    <i className={selectedProject.is_archived ? "fa-solid fa-box-open" : "fa-solid fa-archive"}></i> {selectedProject.is_archived ? 'Unarchive' : 'Archive'}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Details Split Layout */}
          <div className="project-details-layout">
            {/* Sidebar Summary Card */}
            <div className="project-details-sidebar">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="project-logo-badge" style={{ backgroundColor: selectedProject.project_color, width: '48px', height: '48px', fontSize: '18px' }}>
                  {selectedProject.name?.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800 }}>{selectedProject.name}</h3>
                  <span className="badge-capsule" style={{ background: `${selectedProject.project_color}15`, color: selectedProject.project_color, fontSize: '12px', marginTop: '4px' }}>
                    {selectedProject.project_code || selectedProject.project_id}
                  </span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                  <span className="badge-capsule" style={{
                    background: selectedProject.status === 'Active' ? '#d1fae5' : selectedProject.status === 'Completed' ? '#dbeafe' : selectedProject.status === 'Delayed' ? '#fee2e2' : '#fef3c7',
                    color: selectedProject.status === 'Active' ? '#065f46' : selectedProject.status === 'Completed' ? '#1e40af' : selectedProject.status === 'Delayed' ? '#991b1b' : '#92400e',
                  }}>{selectedProject.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Priority:</span>
                  <span style={{ fontWeight: 700 }}>{selectedProject.priority}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Client Name:</span>
                  <span style={{ fontWeight: 700 }}>{selectedProject.client_name || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Client Contact:</span>
                  <span style={{ fontWeight: 700 }}>{selectedProject.client_contact || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Budget:</span>
                  <span style={{ fontWeight: 700, color: 'var(--success)' }}>${selectedProject.estimated_budget || '0.00'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Start Date:</span>
                  <span style={{ fontWeight: 700 }}>{selectedProject.startdate || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Deadline:</span>
                  <span style={{ fontWeight: 700, color: 'var(--danger)' }}>{selectedProject.deadline || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Body Tabs and Contents */}
            <div className="project-details-body">
              <div className="detail-tabs">
                <button className={detailTab === 'info' ? 'active' : ''} onClick={() => setDetailTab('info')}>Info</button>
                <button className={detailTab === 'teams' ? 'active' : ''} onClick={() => setDetailTab('teams')} id="tabProjectTeams">Teams & Allocations</button>
                <button className={detailTab === 'documents' ? 'active' : ''} onClick={() => setDetailTab('documents')}>Documents</button>
                <button className={detailTab === 'comments' ? 'active' : ''} onClick={() => setDetailTab('comments')}>Comments</button>
                <button className={detailTab === 'activity' ? 'active' : ''} onClick={() => setDetailTab('activity')}>Activity Trail</button>
              </div>

              {/* Sub-tab 1: Info Description */}
              {detailTab === 'info' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', color: 'var(--primary-color)', marginBottom: '8px' }}>Project Description</h4>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{selectedProject.description || 'No description provided.'}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', color: 'var(--primary-color)', marginBottom: '8px' }}>Technology Stack</h4>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>{selectedProject.technology_stack || 'None specified.'}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', color: 'var(--primary-color)', marginBottom: '8px' }}>Project Manager</h4>
                    <p style={{ fontSize: '13.5px', fontWeight: 700 }}>
                      {selectedProject.assigned_manager_detail ? (
                        `${selectedProject.assigned_manager_detail.first_name} ${selectedProject.assigned_manager_detail.last_name} (${selectedProject.assigned_manager_detail.username})`
                      ) : 'Unassigned'}
                    </p>
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Teams inside Project */}
              {detailTab === 'teams' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>Project Teams</h4>
                    {['HR', 'MD', 'Manager'].includes(role) && (
                      <button className="projects-btn projects-btn-primary" style={{ padding: '6px 12px', fontSize: '12.5px' }} onClick={() => setIsCreateTeamOpen(true)} id="btnCreateTeam">
                        Create Team
                      </button>
                    )}
                  </div>

                  {selectedProject.teams?.length === 0 ? (
                    <p style={{ color: 'var(--muted)', fontSize: '13.5px' }}>No teams created for this project yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {selectedProject.teams?.map(team => (
                        <div key={team.id} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                              <h5 style={{ margin: 0, fontSize: '14.5px', fontWeight: 700 }}>{team.name}</h5>
                              <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Code: {team.team_code} | Department: {team.department_display}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              {['HR', 'MD', 'Manager'].includes(role) && (
                                <>
                                  <button className="projects-btn projects-btn-secondary" style={{ padding: '4px 8px', fontSize: '11.5px' }} onClick={() => handleQuickAssignTL(team)} id={`btnAssignTL-${team.id}`}>
                                    Assign TL
                                  </button>
                                  <button className="projects-btn projects-btn-secondary" style={{ padding: '4px 8px', fontSize: '11.5px' }} onClick={() => { setSelectedTeamForMember(team); setIsAddMemberOpen(true); }} id={`btnAddMember-${team.id}`}>
                                    Add Member
                                  </button>
                                  <button className="projects-btn projects-btn-danger" style={{ padding: '4px 8px', fontSize: '11.5px' }} onClick={() => handleDeleteTeam(team.id)}>
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          <div style={{ fontSize: '13px' }}>
                            <div>Team Leader: <b>{team.lead_detail ? `${team.lead_detail.first_name} ${team.lead_detail.last_name}` : 'Unassigned'}</b></div>
                            <div style={{ marginTop: '8px' }}>
                              <b>Members ({team.members_detail?.length} / {team.max_size}):</b>
                              {team.members_detail?.length === 0 ? (
                                <span style={{ color: 'var(--muted)', marginLeft: '6px' }}>No employees assigned.</span>
                              ) : (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                                  {team.members_detail?.map(member => (
                                    <div key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '20px', padding: '4px 10px', fontSize: '11.5px' }}>
                                      <span>{member.first_name} {member.last_name} ({member.emp_id})</span>
                                      {['HR', 'MD', 'Manager'].includes(role) && (
                                        <i className="fa-solid fa-times" style={{ cursor: 'pointer', color: 'var(--danger)' }} onClick={() => handleRemoveMember(team.id, member.id, `${member.first_name} ${member.last_name}`)}></i>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sub-tab 3: Documents */}
              {detailTab === 'documents' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                  <h4>Documents & Attachments</h4>
                  
                  {['HR', 'MD', 'Manager', 'TeamLead'].includes(role) && (
                    <form onSubmit={handleUploadDocument} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', background: 'var(--bg-base)', padding: '14px', borderRadius: '8px' }}>
                      <input
                        type="text"
                        placeholder="Document Name (Optional)"
                        value={uploadDocName}
                        onChange={(e) => setUploadDocName(e.target.value)}
                        style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', flex: 1 }}
                      />
                      <input
                        type="file"
                        onChange={(e) => setUploadDocFile(e.target.files[0])}
                        style={{ fontSize: '12.5px' }}
                      />
                      <button type="submit" className="projects-btn projects-btn-primary" style={{ padding: '8px 16px', fontSize: '12.5px' }}>
                        Upload
                      </button>
                    </form>
                  )}

                  {selectedProject.project_documents?.length === 0 ? (
                    <p style={{ color: 'var(--muted)', fontSize: '13.5px' }}>No documents uploaded for this project.</p>
                  ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ background: 'var(--bg-base)' }}>
                          <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>Name</th>
                          <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>Uploaded By</th>
                          <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>Date</th>
                          <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid var(--border)' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.project_documents?.map(doc => (
                          <tr key={doc.id}>
                            <td style={{ padding: '10px', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{doc.name}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{doc.uploaded_by_name}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{new Date(doc.uploaded_at).toLocaleDateString()}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>
                              <a href={doc.file} target="_blank" rel="noreferrer" className="projects-btn projects-btn-secondary" style={{ padding: '4px 8px', fontSize: '11px', textDecoration: 'none', display: 'inline-block' }}>
                                View File
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Sub-tab 4: Comments */}
              {detailTab === 'comments' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                  <h4>Project Discussion Feed</h4>

                  <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '12px' }}>
                    <input
                      type="text"
                      placeholder="Add a comment to this project thread..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '8px', flex: 1, background: 'var(--bg-base)', color: 'var(--text-primary)' }}
                    />
                    <button type="submit" className="projects-btn projects-btn-primary" style={{ padding: '10px 16px' }}>
                      Comment
                    </button>
                  </form>

                  <div className="comments-feed">
                    {selectedProject.project_comments?.length === 0 ? (
                      <p style={{ color: 'var(--muted)', fontSize: '13.5px' }}>No comments posted yet. Start the conversation!</p>
                    ) : (
                      selectedProject.project_comments?.map(comment => (
                        <div key={comment.id} className="comment-item">
                          <div className="comment-avatar">
                            {comment.author_name?.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="comment-content">
                            <div className="comment-header">
                              <span className="comment-author">{comment.author_name}</span>
                              <span className="comment-time">{new Date(comment.created_at).toLocaleString()}</span>
                            </div>
                            <p className="comment-text">{comment.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Sub-tab 5: Audit trail */}
              {detailTab === 'activity' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                  <h4>Project Audit Trail Logs</h4>
                  <div className="activity-log-list" style={{ maxHeight: '400px' }}>
                    {selectedProject.project_audit_logs?.length === 0 ? (
                      <p style={{ color: 'var(--muted)', fontSize: '13.5px' }}>No activity records found for this project.</p>
                    ) : (
                      selectedProject.project_audit_logs?.map(log => (
                        <div key={log.id} className="activity-log-item">
                          <div className="activity-log-icon"><i className="fa-solid fa-clock"></i></div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '13px' }}>{log.action}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{log.details}</div>
                            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                              Performed by: <b>{log.user_name}</b> • {new Date(log.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REPORTS CENTER TAB VIEW */}
      {activeTab === 'reports' && reportsData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="dashboard-panel-card" style={{ margin: 0 }}>
            <div className="panel-header" style={{ flexWrap: 'wrap', gap: '15px' }}>
              <h2><i className="fa-solid fa-file-pdf" style={{ color: 'var(--danger)' }}></i> Exports & Allocations Report</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="projects-btn projects-btn-secondary" onClick={() => handleExport('excel')} id="btnExportExcel">
                  <i className="fa-solid fa-file-excel" style={{ color: 'green', marginRight: '6px' }}></i> Export Excel
                </button>
                <button className="projects-btn projects-btn-secondary" onClick={() => handleExport('pdf')} id="btnExportPDF">
                  <i className="fa-solid fa-file-pdf" style={{ color: 'red', marginRight: '6px' }}></i> Export PDF
                </button>
              </div>
            </div>
            <div className="panel-body" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '15px', color: 'var(--primary-color)', marginBottom: '12px' }}>Employee Allocation Details</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-base)' }}>
                      <th style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>Employee ID</th>
                      <th style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>Name</th>
                      <th style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>Department</th>
                      <th style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>Allocation Status</th>
                      <th style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>Current Project</th>
                      <th style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>Current Team</th>
                      <th style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>Reporting Manager</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportsData.allocations?.map(alloc => (
                      <tr key={alloc.emp_id}>
                        <td style={{ padding: '10px', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{alloc.emp_id}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{alloc.name}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{alloc.department}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>
                          <span className="badge-capsule" style={{
                            background: alloc.status === 'Allocated' ? '#d1fae5' : '#fee2e2',
                            color: alloc.status === 'Allocated' ? '#065f46' : '#991b1b'
                          }}>{alloc.status}</span>
                        </td>
                        <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{alloc.project}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{alloc.team}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{alloc.manager}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS TAB VIEW */}
      {activeTab === 'notifications' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, textAlign: 'left' }}>System Notifications</h4>
            {notifications.filter(n => !n.is_read).length > 0 && (
              <button className="projects-btn projects-btn-secondary" style={{ padding: '6px 12px', fontSize: '12.5px' }} onClick={() => handleMarkNotificationRead(null, true)}>
                Mark All as Read
              </button>
            )}
          </div>

          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="dashboard-panel-card" style={{ padding: '30px', color: 'var(--muted)', fontSize: '14px' }}>
                <i className="fa-solid fa-bell-slash" style={{ fontSize: '2.5rem', marginBottom: '8px', display: 'block' }}></i> No notifications found.
              </div>
            ) : (
              notifications.map(notif => (
                <div key={notif.id} className={`notification-item ${!notif.is_read ? 'unread' : ''}`}>
                  <div className="notification-info">
                    <span className="notification-title">{notif.title}</span>
                    <span className="notification-desc">{notif.message}</span>
                    <span className="notification-time">{new Date(notif.created_at).toLocaleString()}</span>
                  </div>
                  {!notif.is_read && (
                    <button className="projects-btn projects-btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => handleMarkNotificationRead(notif.id)}>
                      Mark Read
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      {isCreateOpen && (
        <div className="projects-modal-overlay">
          <div className="projects-modal">
            <div className="projects-modal-header">
              <h3>Create Enterprise Project</h3>
              <button className="projects-modal-close" onClick={() => setIsCreateOpen(false)}>×</button>
            </div>
            <form onSubmit={handleCreateProject}>
              <div className="projects-modal-body">
                <div className="project-form-grid">
                  <div className="projects-form-group form-group-full">
                    <label>Project Name *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.name}
                      onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                      placeholder="e.g. Finance Ledger Upgrade"
                      id="inpProjectName"
                    />
                  </div>
                  <div className="projects-form-group form-group-full">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Project goals, scope and requirements..."
                      id="inpProjectDesc"
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Client Name</label>
                    <input
                      type="text"
                      value={projectForm.client_name}
                      onChange={(e) => setProjectForm({ ...projectForm, client_name: e.target.value })}
                      placeholder="Client Co."
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Client Contact Info</label>
                    <input
                      type="text"
                      value={projectForm.client_contact}
                      onChange={(e) => setProjectForm({ ...projectForm, client_contact: e.target.value })}
                      placeholder="e.g. client@email.com"
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Budget ($)</label>
                    <input
                      type="number"
                      value={projectForm.estimated_budget}
                      onChange={(e) => setProjectForm({ ...projectForm, estimated_budget: e.target.value })}
                      placeholder="50000"
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={projectForm.project_category}
                      onChange={(e) => setProjectForm({ ...projectForm, project_category: e.target.value })}
                      placeholder="e.g. Fintech"
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Priority</label>
                    <select value={projectForm.priority} onChange={(e) => setProjectForm({ ...projectForm, priority: e.target.value })}>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div className="projects-form-group">
                    <label>Technology Stack</label>
                    <input
                      type="text"
                      value={projectForm.technology_stack}
                      onChange={(e) => setProjectForm({ ...projectForm, technology_stack: e.target.value })}
                      placeholder="React, Django, Python"
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={projectForm.start_date}
                      onChange={(e) => setProjectForm({ ...projectForm, start_date: e.target.value })}
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Deadline (End Date)</label>
                    <input
                      type="date"
                      value={projectForm.end_date}
                      onChange={(e) => setProjectForm({ ...projectForm, end_date: e.target.value })}
                      id="inpProjectDeadline"
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Project Color Theme</label>
                    <input
                      type="color"
                      value={projectForm.project_color}
                      onChange={(e) => setProjectForm({ ...projectForm, project_color: e.target.value })}
                      style={{ padding: '0px', height: '38px', cursor: 'pointer' }}
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Assign Project Manager</label>
                    <select value={projectForm.assigned_manager} onChange={(e) => setProjectForm({ ...projectForm, assigned_manager: e.target.value })} id="selAssignManager">
                      <option value="">Select Manager</option>
                      {managers.map(m => (
                        <option key={m.id} value={m.id}>{m.name || m.username}</option>
                      ))}
                    </select>
                  </div>
                  <div className="projects-form-group form-group-full">
                    <label>Project Logo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className="projects-modal-footer">
                <button type="button" className="projects-btn projects-btn-secondary" onClick={() => setIsCreateOpen(false)}>Cancel</button>
                <button type="submit" className="projects-btn projects-btn-primary" id="btnSubmitProject">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PROJECT DETAILS MODAL */}
      {isEditOpen && (
        <div className="projects-modal-overlay">
          <div className="projects-modal">
            <div className="projects-modal-header">
              <h3>Edit Project Details</h3>
              <button className="projects-modal-close" onClick={() => setIsEditOpen(false)}>×</button>
            </div>
            <form onSubmit={handleEditProject}>
              <div className="projects-modal-body">
                <div className="project-form-grid">
                  <div className="projects-form-group form-group-full">
                    <label>Project Name *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.name}
                      onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                      placeholder="e.g. Finance Ledger Upgrade"
                      id="inpEditProjectName"
                    />
                  </div>
                  <div className="projects-form-group form-group-full">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Client Name</label>
                    <input
                      type="text"
                      value={projectForm.client_name}
                      onChange={(e) => setProjectForm({ ...projectForm, client_name: e.target.value })}
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Client Contact Info</label>
                    <input
                      type="text"
                      value={projectForm.client_contact}
                      onChange={(e) => setProjectForm({ ...projectForm, client_contact: e.target.value })}
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Budget ($)</label>
                    <input
                      type="number"
                      value={projectForm.estimated_budget}
                      disabled={role !== 'HR' && role !== 'MD'}
                      onChange={(e) => setProjectForm({ ...projectForm, estimated_budget: e.target.value })}
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={projectForm.project_category}
                      onChange={(e) => setProjectForm({ ...projectForm, project_category: e.target.value })}
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Priority</label>
                    <select value={projectForm.priority} onChange={(e) => setProjectForm({ ...projectForm, priority: e.target.value })}>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div className="projects-form-group">
                    <label>Technology Stack</label>
                    <input
                      type="text"
                      value={projectForm.technology_stack}
                      onChange={(e) => setProjectForm({ ...projectForm, technology_stack: e.target.value })}
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={projectForm.start_date}
                      onChange={(e) => setProjectForm({ ...projectForm, start_date: e.target.value })}
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Deadline (End Date)</label>
                    <input
                      type="date"
                      value={projectForm.end_date}
                      onChange={(e) => setProjectForm({ ...projectForm, end_date: e.target.value })}
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Project Color Theme</label>
                    <input
                      type="color"
                      value={projectForm.project_color}
                      onChange={(e) => setProjectForm({ ...projectForm, project_color: e.target.value })}
                      style={{ padding: '0px', height: '38px' }}
                    />
                  </div>
                  <div className="projects-form-group">
                    <label>Project Status</label>
                    <select value={projectForm.status} onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })} id="selEditProjectStatus">
                      <option value="Pending">Pending</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Delayed">Delayed</option>
                    </select>
                  </div>
                  {['HR', 'MD'].includes(role) && (
                    <div className="projects-form-group form-group-full">
                      <label>Assign Project Manager</label>
                      <select value={projectForm.assigned_manager} onChange={(e) => setProjectForm({ ...projectForm, assigned_manager: e.target.value })}>
                        <option value="">Select Manager</option>
                        {managers.map(m => (
                          <option key={m.id} value={m.id}>{m.name || m.username}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="projects-modal-footer">
                <button type="button" className="projects-btn projects-btn-secondary" onClick={() => setIsEditOpen(false)}>Cancel</button>
                <button type="submit" className="projects-btn projects-btn-primary" id="btnSubmitEditProject">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TEAM MODAL */}
      {isCreateTeamOpen && (
        <div className="projects-modal-overlay">
          <div className="projects-modal">
            <div className="projects-modal-header">
              <h3>Create Team for '{selectedProject?.name}'</h3>
              <button className="projects-modal-close" onClick={() => setIsCreateTeamOpen(false)}>×</button>
            </div>
            <form onSubmit={handleCreateTeam}>
              <div className="projects-modal-body">
                <div className="projects-form-group">
                  <label>Team Name *</label>
                  <input
                    type="text"
                    required
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    placeholder="e.g. Frontend Squad"
                    id="inpTeamName"
                  />
                </div>
                <div className="projects-form-group">
                  <label>Select Department</label>
                  <select value={teamForm.department} onChange={(e) => setTeamForm({ ...teamForm, department: e.target.value })}>
                    {departmentOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="projects-form-group">
                  <label>Assign Team Leader</label>
                  <select value={teamForm.lead} onChange={(e) => setTeamForm({ ...teamForm, lead: e.target.value })} id="selTeamLead">
                    <option value="">Select Team Lead</option>
                    {teamLeads.map(tl => (
                      <option key={tl.id} value={tl.id}>{tl.name || tl.username}</option>
                    ))}
                  </select>
                </div>
                <div className="projects-form-group">
                  <label>Maximum Team Size</label>
                  <input
                    type="number"
                    value={teamForm.max_size}
                    onChange={(e) => setTeamForm({ ...teamForm, max_size: parseInt(e.target.value) || 10 })}
                    placeholder="10"
                  />
                </div>
                <div className="projects-form-group">
                  <label>Description</label>
                  <textarea
                    rows={2}
                    value={teamForm.description}
                    onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })}
                    placeholder="Brief squad focus..."
                  />
                </div>
              </div>
              <div className="projects-modal-footer">
                <button type="button" className="projects-btn projects-btn-secondary" onClick={() => setIsCreateTeamOpen(false)}>Cancel</button>
                <button type="submit" className="projects-btn projects-btn-primary" id="btnSubmitTeam">Create Team</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      {isAddMemberOpen && (
        <div className="projects-modal-overlay">
          <div className="projects-modal">
            <div className="projects-modal-header">
              <h3>Assign Employee to Team '{selectedTeamForMember?.name}'</h3>
              <button className="projects-modal-close" onClick={() => setIsAddMemberOpen(false)}>×</button>
            </div>
            <div className="projects-modal-body">
              <div className="projects-form-group">
                <label>Select Employee *</label>
                <select onChange={(e) => handleAddMember(e.target.value)} defaultValue="" id="selEmployeeMember">
                  <option value="" disabled>Choose Employee</option>
                  {employeesList.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name || emp.username} ({emp.emp_id}) — {emp.department_display || emp.department}
                    </option>
                  ))}
                </select>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px' }}>
                Note: An employee can only be assigned to one active project at a time. The system will prevent double booking.
              </p>
            </div>
            <div className="projects-modal-footer">
              <button type="button" className="projects-btn projects-btn-secondary" onClick={() => setIsAddMemberOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
