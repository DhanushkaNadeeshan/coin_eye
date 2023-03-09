const _logout = () => {
  return (req, res) => {
    res.clearCookie("key");
    res.status(200).json({ success: true });
  };
};

module.exports = _logout;
