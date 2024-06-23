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
    let propietario = false;
    let logueado = false;

    db.Producto.findByPk(id, criterio)
      .then(function (results) {
        if (!results) {
          return res.status(404).send('Producto noo index encontrado');
        }

        if (req.session.user != undefined && req.session.user.id == results.usuario.id) {
          propietario = true;

        }

        if (req.session.user != undefined) {
          logueado = true
        }
        res.render('product', {
          producto: results,
          comentarios: results.comentarios || [],
          propietario: propietario,
          logueado: logueado,
          user: req.session.user
        });
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
          return res.status(404).send('Productooo no encontrado');
        }
        return res.render("product-edit", { producto: result });
      }).catch(function (err) {
        console.log(err);
        return res.status(500).send('Error en el servidor');
      });
  },

  editProdForm: function (req, res) {
   
    let form = req.body;

    let filtroSession = {
      where: { id: req.params.id }
    };
    productUpdate = {
      nombreProduct: form.nombreProduct,
      imagenProduct: form.imagenProduct,
      descripcionProduct: form.descripcionProduct,
      clienteId: req.session.user.id
    }
    db.Producto.update(productUpdate, filtroSession)
      .then(() => {
        return res.redirect("/product/" + req.params.id);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Error en el servidor en editProdForm');
      });
  },
  detalle: function (req, res) {
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
          return res.status(404).send('Producto noo encontrado');
        }

        if (req.session.user != undefined && req.session.user.id == results.user.id) {
          condition = true;
        }
        res.render('product', {
          producto: results,
          comentarios: results.comentarios || [],
          propietario: propietario,
          logueado:logueado,
          user: req.session.user
        });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(500).send('Error en el servidor');
      });
  },
  productAdd: function (req, res) {
    res.render("product-add")
  },
  
  create: function (req, res) {
    
    let { nombre, descripcion, imagen } = req.body
    if (req.session.user == undefined){
      return res.redirect("/")
    }
    let id = req.session.user.id


    db.Producto.create({
      clienteId: id,
      nombreProduct: nombre,
      imagenProduct: imagen,
      descripcionProduct: descripcion,

    })
      .then(function (db) {
        return res.redirect('/product/' + product.id) 
      })
      .catch(function (err) {
        console.log(err)
      })
  },

  store: function (req, res) {
    let form = req.body;
    let errors = validationResult(req);
    if (req.session == undefined || req.session.user == undefined){
      return res.redirect("/");
    }

    if (errors.isEmpty()) {
      //preparo nuevo auto
      newCar ={
        nombreProduct:form.nombreProduct,
        imagenProduct:form.imagenProduct,
        descripcionProduct:form.descripcionProduct,
        clienteId:req.session.user.id
      }
      db.Producto.create(newCar)
        .then((results) => {
          return res.redirect("/product/" + results.id);
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
    const id = req.params.id

    let filtrado = {
      where: {
        id: id
      }
    };
    let filtradoComments = {
      where: {
        productId: id
      }
    };

    if (req.session.user != undefined) {
      db.Comentario.destroy(filtradoComments)
      .then((result) => {
        db.Producto.destroy(filtrado)
        .then((result) => {
          return res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send('Error en el servidor en destroy');
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Error en el servidor en destroy');
      });
      
    } else {
      return res.redirect("/");
    }
}}

module.exports = productController;
