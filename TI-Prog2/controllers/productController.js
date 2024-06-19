const { Association } = require('sequelize');
const db = require('../database/models');
const { validationResult } = require('express-validator');

const productController = {
  index: function (req, res, next) {
    const id = req.params.id;
    let criterio = {
      include: [
        { association: "usuario" },
        {
          association: "comentarios",
          include: [{ association: 'usuario' }]
        }
      ],
      order: [[{ model: db.Comentario, as: 'comentarios' }, 'createdAt', 'DESC']]
    }
    let condition = false;

    db.Producto.findByPk(id, criterio)
      .then(function (results) {
        if (!results) {
          return res.status(404).send('Producto no encontrado');
        }

        if (req.session.user != undefined && req.session.user.id == results.usuario.id) {
          condition = true;
        }
        return res.render('product', { producto: results, comentarios: results.comentarios || [], condition: condition });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(500).send('Error en el servidor');
      });
  },

  editProd: function (req, res) {
    let id = req.params.id;
    let filtro = {
      include: [
        { association: "usuario" }
      ]
    };
    db.Producto.findByPk(id, filtro)
      .then(function (result) {
        if (!result) {
          return res.status(404).send('Producto no encontrado');
        }
        return res.render("product-edit", { producto: result });
      }).catch(function (err) {
        console.log(err);
        return res.status(500).send('Error en el servidor');
      });
  },

  editProdForm: function (req, res) {
    let form = req.body;
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      let filtradoEdit = {
        include: [
          { association: "usuario" }
        ]
      };

      db.Producto.findByPk(req.params.id, filtradoEdit)
        .then((resultados) => {
          if (!resultados) {
            return res.status(404).send('Producto no encontrado');
          }
          return res.render('product-edit', {
            errors: errors.array(),
            old: req.body,
            productFind: resultados
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send('Error en el servidor');
        });
    } else {
      let filtroSession = {
        where: { id: req.params.id }
      };

      if (req.session.user) {
        db.Producto.update(form, filtroSession)
          .then(() => {
            return res.redirect("/product/id/" + req.params.id);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send('Error en el servidor');
          });
      } else {
        return res.redirect("/users/profile/id/" + req.params.id);
      }
    }
  },

  detalle: function (req, res) {
    let idProduct = req.params.idProduct;

    const filtro = {
      include: [{
        association: 'comentarios',
        include: [{ association: 'usuario' }]
      }, {
        association: 'usuario'
      }],
      order: [
        ["comentarios", "createdAt", "DESC"]
      ]
    };

    db.Producto.findByPk(idProduct, filtro)
      .then((result) => {
        if (!result) {
          return res.status(404).send('Producto no encontrado');
        }
        return res.render("product", { productFind: result });
      }).catch((err) => {
        console.log(err);
        return res.status(500).send('Error en el servidor');
      });
  },

  create: function (req, res) {
    db.User.findOne()
      .then((user) => {
        if (req.session.user != undefined) {
          id = req.session.user.id;
        }
        else if (req.cookies.userId != undefined) {
          id = req.cookies.userId;
        }
        else {
          return res.redirect("/users/login");
        }

        db.User.findByPk(id)
          .then(function (results) {
            if (!results) {
              return res.status(404).send('Usuario no encontrado');
            }
            return res.render('product-add', { usuario: results });
          })
          .catch(function (error) {
            console.log(error);
            return res.status(500).send('Error en el servidor');
          });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(500).send('Error en el servidor');
      });
  },

  store: function (req, res) {
    let form = req.body;
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Producto.create(form)
        .then((results) => {
          return res.redirect("/product/id/" + results.id);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send('Error en el servidor');
        });
    } else {
      return res.render('product-add', { errors: errors.mapped(), old: req.body });
    }
  },

  formUpdate: function (req, res) {
    let form = req.body;
    let criterio = {
      include: [
        { association: "usuario" }
      ]
    };

    db.Producto.findByPk(form.id, criterio)
      .then(function (results) {
        if (!results) {
          return res.status(404).send('Producto no encontrado');
        }
        return res.render('product-edit', { producto: results });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Error en el servidor');
      });

  },

  update: function (req, res) {
    let form = req.body;
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let filtro = {
        where: {
          id: form.id
        }
      };
      if (req.session.user != undefined) {
        let id = req.session.user.id;
        if (form.idUsuario == id) {
          db.Producto.update(form, filtro)
            .then((result) => {
              return res.redirect("/product/id/" + form.id);
            }).catch((err) => {
              console.log(err);
              return res.status(500).send('Error en el servidor');
            });
        } else {
          return res.redirect("/users/profile/id/" + id);
        }
      } else {
        return res.redirect("/users/login");
      }
    } else {
      let criterio2 = {
        include: [
          { association: "usuario" }
        ]
      };

      db.Producto.findByPk(form.id, criterio2)
        .then(function (results) {
          if (!results) {
            return res.status(404).send('Producto no encontrado');
          }
          return res.render('product-edit', { errors: errors.mapped(), old: req.body, producto: results });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send('Error en el servidor');
        });
    }
  },

  destroy: function (req, res) {
    let form = req.body;

    let filtrado = {
      where: {
        id: form.id
      }
    };

    if (req.session.user != undefined) {
      let id = req.session.user.id;
      if (form.idUsuario == id) {
        db.Producto.destroy(filtrado)
          .then((result) => {
            return res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send('Error en el servidor');
          });
      } else {
        return res.redirect("/users/profile/id/" + id);
      }
    } else {
      return res.redirect("/users/login");
    }
  }
}

module.exports = productController;
