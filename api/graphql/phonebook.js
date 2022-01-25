const { buildSchema } = require('graphql');
const { Op } = require("sequelize");
const {Phonebooks} = require('../models')

const schema = buildSchema(`
  scalar Date

  input PhonebookInput {
    name: String
    phone: String
  }

  type Phonebook {
    id: ID!
    name: String
    phone: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getPhonebooks: [Phonebook]
    getPhonebook(id: ID!): Phonebook
    searchPhonebooks(name: String, phone: String, sort: String): [Phonebook]
  }

  type Mutation {
    createPhonebook(input: PhonebookInput): Phonebook
    updatePhonebook(id: ID!, input: PhonebookInput): Phonebook
    deletePhonebook(id: ID!): Phonebook
  }
`);

const solution = {
  getPhonebooks: async () => {
    try {
      const phonebook = Phonebooks.findAll({})
      return phonebook
    } catch (err) {
      throw new Error('gagal ambil data');
    }
  },
  getPhonebook: async ({ id }) => {
    try {
      const phonebook = await Phonebooks.findOne({ where: { id: id } })
      return phonebook
    } catch (err) {
      throw new Error('gagal ambil data');
    }
  },
  searchPhonebooks: async ({ name, phone, sort }) => {
    if(!sort){
      sort=['id','ASC']
    }
    try {
      if (sort) {
        switch (sort) {
          case 'id-desc':
            sort = ['id','DESC']
            break
          case 'name-asc':
            sort = ['name','ASC']
            break
          case 'name-desc':
            sort = ['name','DESC']
            break
          case 'phone-asc':
            sort = ['phone','ASC']
            break
          case 'phone-desc':
            sort = ['phone','DESC']
            break
          case 'id-asc':
          default:
            sort=['id','ASC']
            break
        }
      }
      let data
      if (!name && !phone) {
        data = await Phonebooks.findAll({
          order:[sort]
        })
      } else if (!name && phone) {
        data = await Phonebooks.findAll({
          where:{
            phone:{
              [Op.substring]:phone
            }
          },
          order:[sort], 
        })
      } else if (name && !phone) {
        console.log(sort)
        data = await Phonebooks.findAll({
          where:{
            name:{
              [Op.substring]:name
            }
          },
          order:[sort],  
        })
      } else if (name && phone) {
        data = await Phonebooks.findAll({
          where:{
            phone:{
              [Op.substring]:phone
            },
            name:{
              [Op.substring]:name
            }
          },
          order:[sort],  
        })
      }
      return data
    } catch (err) {
      throw new Error('gagal ambil data');
    }
  },
  createPhonebook: async ({ input }) => {
    try {
      const phonebooks = await Phonebooks.create(input)
      return phonebooks
    } catch (err) {
      throw new Error('gagal ambil data');
    }
  },
  updatePhonebook: async ({ id, input }) => {
    try {
      const phonebook = await Phonebooks.update(input, {
        where:{
          id:id
        }
      }).then(function(result){
        return result
      })
    } catch (err) {
      throw new Error('gagal ambil data');
    }
  },
  deletePhonebook: async ({ id }) => {
    try {
      const phonebook = await Phonebooks.destroy({
        where:{
          id:id
        }
      }).then(function(result){
        console.log(result)
      })
      console.log(phonebook)
      return phonebook
    } catch (err) {
      throw new Error('gagal ambil data');
    }
  },
};

module.exports = { schema, solution }