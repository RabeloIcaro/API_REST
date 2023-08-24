class HomeController {
  async index(req, res) {
    try {
      res.json('Index');
    } catch (e) {
      res.json(e);
    }
  }
}

export default new HomeController();
