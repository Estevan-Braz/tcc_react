import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
Modal.setAppElement('#root'); // Defina o elemento principal da aplicação para acessibilidade
const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ id: '', nome: '' });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  useEffect(() => {
    // Fetch all categories
    axios.get('http://localhost:8080/categoria/all')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);
  const openModal = (id) => {
    // Fetch category by ID
    axios.get(`http://localhost:8080/categoria/findById?id=${id}`)
      .then(response => {
        setSelectedCategory(response.data);
        setModalIsOpen(true);
      })
      .catch(error => {
        console.error('There was an error fetching the category!', error);
      });
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCategory(null);
  };
  const openEditModal = (category) => {
    setEditFormData(category);
    setEditModalIsOpen(true);
  };
  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setEditFormData({ id: '', nome: ''});
  };
  const openNewCategoryModal = () => {
    setNewCategoryModalIsOpen(true);
  };
  const closeNewCategoryModal = () => {
    setNewCategoryModalIsOpen(false);
    setNewCategoryName('');
  };
  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setDeleteModalIsOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
    setCategoryToDelete(null);
  };
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    // Update category by ID
    axios.put('http://localhost:8080/categoria/update', null, {
      params: {
        id: editFormData.id,
        nome: editFormData.nome,
      }
    })
    .then(response => {
      // Update the category in the state
      setCategories(categories.map(category =>
        category.id === editFormData.id ? { ...category, nome: editFormData.nome } : category
      ));
      closeEditModal();
    })
    .catch(error => {
      console.error('There was an error updating the category!', error);
    });
  };
  const handleNewCategorySubmit = (e) => {
    e.preventDefault();
    // Create new category
    axios.post('http://localhost:8080/categoria/add', null, {
      params: {
        nome: newCategoryName,
      }
    })
    .then(response => {
      // Add the new category to the state
      setCategories([...categories, response.data]);
      closeNewCategoryModal();
    })
.catch(error => {
      console.error('There was an error creating the category!', error);
    });
  };
  const handleDeleteCategory = () => {
    // Delete category by ID
    axios.delete('http://localhost:8080/categoria/delete', {
      params: {
        id: categoryToDelete.id,
      }
    })
    .then(response => {
      // Remove the category from the state
      setCategories(categories.filter(category => category.id !== categoryToDelete.id));
      closeDeleteModal();
    })
    .catch(error => {
      console.error('There was an error deleting the category!', error);
    });
  };
  return (
    <div className="container mx-auto p-4">
      <button
        onClick={openNewCategoryModal}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Nova Categoria
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Nome</th>
            <th className="py-2">Opções</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id} className="border-t">
              <td className="py-2">{category.id}</td>
              <td className="py-2">{category.nome}</td>
              <td className="py-2 flex space-x-2">
                <button onClick={() => openModal(category.id)} className="text-blue-500 hover:text-blue-700">
                  <FaInfoCircle />
                </button>
                <button onClick={() => openEditModal(category)} className="text-green-500 hover:text-green-700">
                  <FaEdit />
                </button>
                <button onClick={() => openDeleteModal(category)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Category Details"
        className="bg-white p-4 rounded shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedCategory && (
          <div>
            <h2 className="text-xl font-bold mb-4">Detalhes da Categoria</h2>
            <p><strong>ID:</strong> {selectedCategory.id}</p>
            <p><strong>Nome:</strong> {selectedCategory.nome}</p>
            <button onClick={closeModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
              Fechar
            </button>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Category"
        className="bg-white p-4 rounded shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-bold mb-4">Editar Categoria</h2>
        <form onSubmit={handleEditFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={editFormData.nome}
              onChange={handleEditFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={closeEditModal}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={newCategoryModalIsOpen}
        onRequestClose={closeNewCategoryModal}
        contentLabel="New Category"
        className="bg-white p-4 rounded shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-bold mb-4">Nova Categoria</h2>
        <form onSubmit={handleNewCategorySubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newCategoryName">
              Nome
            </label>
            <input
              type="text"
              id="newCategoryName"
              name="newCategoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={closeNewCategoryModal}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Category"
        className="bg-white p-4 rounded shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-bold mb-4">Excluir Categoria</h2>
        <p>Tem certeza de que deseja excluir a categoria <strong>{categoryToDelete?.nome}</strong>?</p>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleDeleteCategory}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Excluir
          </button>
          <button
            onClick={closeDeleteModal}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default CategoryTable;