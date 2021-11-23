import React, { Component } from 'react';
import axios from 'axios';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import _ from 'lodash'
import ReactPaginate from 'react-paginate'
import TableSearch from './TableSearch/TableSearch'


class App extends Component {

	state = {
		isLoading: true,
		data: [],
		search: '',
		sort: 'asc',  // 'desc'
		sortTwo: '↓',  // '↑'
		sortItems: 'dob.age', // default
		currentPage: 0,
	}

	async componentDidMount() {
		const response = await axios.get(`https://randomuser.me/api/?results=1470`)
		const data = await response.data.results
		this.setState({
			isLoading: false,
			data: _.orderBy(data, this.state.sortItems, this.state.sort)
		})
	}

	onSort = sortItems => {
		const cloneData = this.state.data.concat()
		const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
		const sortTwo = this.state.sortTwo === '↓' ? '↑' : '↓';
		const data = _.orderBy(cloneData, sortItems, sort)

		this.setState({ data, sort, sortTwo, sortItems })
	}

	pageChangeHandler = ({ selected }) => (
		this.setState({ currentPage: selected })
	)

	searchHandler = search => (
		this.setState({ search, currentPage: 0 })
	)

	getFilteredData() {
		const { data, search } = this.state

		if (!search) {
			return data
		}
		var result = data.filter(item => {
			return (
				item.name["first"].toLowerCase().includes(search.toLowerCase()) ||
				item.name["last"].toLowerCase().includes(search.toLowerCase()) ||
				item["email"].toLowerCase().includes(search.toLowerCase()) ||
				item["phone"].includes(search)
			);
		});
		if (!result.length) {
			result = this.state.data
		}

		return result
	}

	render() {

		const pageSize = 50

		const filteredData = this.getFilteredData()
		const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]

		const pageCount = Math.ceil(filteredData.length / pageSize)


		return (
			<div className="container">
				<h1 className="text-center mb-4 " style={{ color: '#555', fontWeight: '700', textShadow: '1px 1px 2px #999' }}>Client Pagination</h1>
				{
					this.state.isLoading
						? <Loader />
						: <React.Fragment>
							<TableSearch onSearch={this.searchHandler} />
							<Table
								data={displayData}
								onSort={this.onSort}
								sort={this.state.sort}
								sortTwo={this.state.sortTwo}
								sortItems={this.state.sortItems}
							/>
						</React.Fragment>
				}
				{
					this.state.data.length > pageSize
						? <ReactPaginate
							previousLabel={'<'}
							nextLabel={'>'}
							breakLabel={' . . . '}
							breakClassName={'break-me mt-1 ms-2 me-2 text-danger h6'}
							pageCount={pageCount}
							marginPagesDisplayed={3}
							pageRangeDisplayed={5}
							onPageChange={this.pageChangeHandler}
							containerClassName={'pagination justify-content-center'}
							activeClassName={'active'}
							pageClassName="page-item"
							pageLinkClassName="page-link bg-secondary"
							previousClassName="page-item"
							nextClassName="page-item"
							previousLinkClassName="page-link bg-dark text-white"
							nextLinkClassName="page-link bg-dark text-white"
							forcePage={this.state.currentPage}
						/> : null
				}
			</div>
		);
	}
}

export default App;
