import React, {useState} from 'react';
import { connect } from 'react-redux';
import { updateField, addTodoAndClear, toggleFavorite, deleteTodo, sortByName, makeInputEdits  } from '../actions';

const Index = ({prodId, name, price, description, isFavorite, updateField, addTodoAndClear, todos, toggleFavorite, deleteTodo, sortByName , makeInputEdits}) => {


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

        const [isEdit , setIsEdit ] = useState(false);

        const [editFields , setEditFields ] = useState({
            'edit_name' : todo.name,
            'edit_price' : todo.price,
            'edit_description' : todo.description
        });

        const cardStyle = {
            border: '2px solid black',
            padding: '20px',
            margin: '20px',
            display: 'block'
        };

        const handleEditOnChange = (e) => {
            setEditFields({
                ...editFields,
                [e.target.name] : e.target.value
            })
        };

        const handleSubmitEdits = ()=>{
            // editFields
            console.log('at least')
            makeInputEdits(editFields, idx)
        };


        const favorite = todo.isFavorite ? 'True' : 'False';


        const borders = {
            border: '1px solid black'
        };

        let content = isEdit ?
            <div >
                <p>Product ID: </p>
                <p>Item name:<input type="text" value={editFields["edit_name"]} onChange={handleEditOnChange} name={"edit_name"} style={borders} /></p>

                <p>Price: <input type="text" value={editFields["edit_price"]} onChange={handleEditOnChange} name={"edit_price"} style={borders} /></p>

                <p>Description: <input type="text" value={editFields["edit_description"]} onChange={handleEditOnChange} name={"edit_description"} style={borders} /></p>

                <p>IsFavorite: {favorite}</p>

                <input value={'make change'} type={'button'}  onClick={handleSubmitEdits}  style={borders}  />
            </div>



            : <div style={cardStyle}>
            <input type={'button'} onClick={() => setIsEdit(!isEdit)} value={'Edit'}/>
            <input type={'button'} onClick={() => handleDelete(idx)} value={'Delete'}/>
            <input type={'button'} onClick={() => handleFavorite(idx)} value={'Favorite'}/>
            <p>Product ID: {todo.prodId} </p>
            <p>Item name: {todo.name}</p>
            <p>Price: {todo.price}</p>
            <p>Description: {todo.description}</p>
            <p>IsFavorite: {favorite}</p>
        </div>;

        return content;
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
    sortByName,
    makeInputEdits
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Index);
