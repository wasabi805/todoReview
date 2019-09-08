import React from 'react';
import { connect } from 'react-redux';
import { updateField, addTodoAndClear, toggleFavorite, deleteTodo, sortByName } from '../actions';

const Index = ({prodId, name, price, description, isFavorite, updateField, addTodoAndClear, todos, toggleFavorite, deleteTodo, sortByName}) => {

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        updateField(name, value);
    };

    const handleSubmit = () => {
        // this function does things
        addTodoAndClear({
            prodId: prodId,
            name: name,
            price: price,
            description: description,
            isFavorite: isFavorite
        });
    };

    const handleDelete = (idx) => {
        deleteTodo(idx);
    };

    const handleFavorite = (idx) => {
        toggleFavorite(idx);
    };

    const handleSortByName = ()=>{
        sortByName(todos);
    };

    const TodoCard = ({todo, idx}) => {
        const cardStyle = {
            border: '2px solid black',
            padding: '20px',
            margin: '20px',
            display: 'block'
        };

        const favorite = todo.isFavorite ? 'True' : 'False';


        return (
          <div style={cardStyle}>
              <input type={'button'} onClick={() => handleDelete(idx)} value={'Delete'}/>
              <input type={'button'} onClick={() => handleFavorite(idx)} value={'Favorite'}/>
              <p>Product ID: {todo.prodId} </p>
              <p>Item name: {todo.name}</p>
              <p>Price: {todo.price}</p>
              <p>Description: {todo.description}</p>
              <p>IsFavorite: {favorite}</p>
          </div>
        );
    };

    return (
        <div>
            ID:
            <input id={prodId}  type="text" value={prodId} onChange={handleChange} name={"prodId"}/>
            <br/>
            Name:
            <input id={prodId} type="text" value={name} onChange={handleChange} name={"name"}/>
            <br/>
            Price:
            <input  id={prodId} type="text" value={price} onChange={handleChange} name={"price"}/>
            <br/>
            Description:
            <input id={prodId} type="text" value={description} onChange={handleChange} name={"description"}/>
            <br/>
            <input type="submit" onClick={handleSubmit}/>
            <br/>
            <br/>

            <div style={{width: '50vw', display: 'inline-block'}} className={'sort-btns-container'}>
                <input type={'button'} value={'ID'}  />
                <input type={'button'} value={'Name'} onClick={handleSortByName} />
                <input type={'button'} value={'Price'}/>
                <input type={'button'} value={'Description'}/>
            </div>


            <div className={'todos'}>
                {todos.map((todo, idx) => {
                    return <TodoCard todo={todo} idx={idx} key={`todo-${idx}`}/>
                })}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        prodId : state.productsReducer.prodId,
        name: state.productsReducer.name,
        price : state.productsReducer.price,
        description: state.productsReducer.description,
        isFavorite: state.productsReducer.isFavorite,
        todos: state.productsReducer.todos,

    }
};

const mapDispatchToProps = {
    updateField,
    addTodoAndClear,
    toggleFavorite,
    deleteTodo,
    sortByName
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Index);
