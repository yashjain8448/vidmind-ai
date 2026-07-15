exports.googleCallback = (req, res) => {
  res.redirect(process.env.CLIENT_URL);
};

exports.getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  res.json({
    success: true,
    user: req.user,
  });
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid");

      res.json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
};
