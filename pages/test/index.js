import React from 'react'
import { connect } from 'react-redux'

const Index = () => {
    return (
        <div>
            From Test
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