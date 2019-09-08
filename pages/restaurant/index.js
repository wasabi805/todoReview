import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const MenuDetails = ({menuItem}) => {
    return (
        <div>
            <p>Items in Category: ({menuItem.shortName}) </p>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex'}}>
                    <span style={{width: '200px', marginRight: '20px'}}>Name</span>
                    <span style={{flex: '1'}}>Description</span>
                </div>

                {menuItem.data.map((item, idx) => {
                    return (
                        <div style={{display: 'flex'}} key={`item-${idx}`}>
                            <span style={{width: '200px', marginRight: '20px'}}>{item.name}</span>
                            <span style={{flex: '1'}}>{item.description}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );

};

const Index = () => {
    const [categories, setCategories] = useState([]);
    const [menuDetail, setMenuDetail] = useState(null);

    useEffect(() => {
        axios.get('http://stream-restaurant-menu-svc.herokuapp.com/category')
            .then(function (res) {
                setCategories(res.data)
            });
    }, []);

    const handleCatClick = (shortName) => {
        let url = `https://stream-restaurant-menu-svc.herokuapp.com/item?category=${shortName}`;
        axios.get(url)
            .then(function (res) {
                setMenuDetail({
                    shortName: shortName,
                    data: res.data
                })
            });
    };

    return (
        <div style={{display: 'flex'}}>
            <div className={'left-side'}>
                <ul>
                    {categories.map((cat, idx) => {
                        const style = {
                            cursor: 'pointer'
                        };

                        return (
                            <li style={style} onClick={() => handleCatClick(cat.short_name)} key={`cat-${idx}`}>
                                {cat.name}
                                <span>({cat.short_name})</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className={'right-side'} style={{flex: 1, marginLeft: '100px'}}>
                {menuDetail && <MenuDetails menuItem={menuDetail}/>}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = {

};

export default connect(
    mapStateToProps,
    null)(Index);