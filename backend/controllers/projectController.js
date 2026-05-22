import Project from '../models/Project.js';

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project (Initial simple version for Step 2)
// @route   POST /api/projects
// @access  Public (Will be protected in Step 3)
export const createProject = async (req, res) => {
  try {
    const { title, description, image, technologies, githubLink, liveLink } = req.body;
    const project = new Project({
      title,
      description,
      image,
      technologies,
      githubLink,
      liveLink
    });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Public (Will be protected in Step 3)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      project.image = req.body.image || project.image;
      project.technologies = req.body.technologies || project.technologies;
      project.githubLink = req.body.githubLink || project.githubLink;
      project.liveLink = req.body.liveLink || project.liveLink;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Public (Will be protected in Step 3)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
