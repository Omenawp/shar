import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { recieveUsers, follow, unfollow, clearState, updateSearchText } from '../../redux/users-reducer';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.recieveUsers(this.props.pageSize, this.props.currentPage, this.props.searchText)
    }

    nextUsersPage = (page) => {
        this.props.recieveUsers(this.props.pageSize, page, this.props.searchText);
    }
    searchUsers = () => {
        this.props.clearState();
        this.props.recieveUsers(this.props.pageSize, 1, this.props.searchText);
    }

    componentWillUnmount() {
        this.props.clearState();
        this.props.updateSearchText('');
    }

    render() {
        return <Users currentPage={this.props.currentPage} followingProgress={this.props.followingProgress}
            nextUsersPage={this.nextUsersPage} users={this.props.users}
            maxPage={this.props.maxPage} isFetching={this.props.isFetching}
            follow={this.props.follow} unfollow={this.props.unfollow}
            searchText={this.props.searchText} updateSearchText={this.props.updateSearchText}
            searchUsers={this.searchUsers} />
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        maxPage: state.usersPage.maxPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress,
        searchText: state.usersPage.searchText
    }
}

export default compose(
    connect(mapStateToProps, {recieveUsers, follow, unfollow, clearState, updateSearchText }), 
    withAuthRedirect)(UsersContainer)