import React from 'React'

function Journal01ListItem(props) {
  // console.log('props')
  // console.log(props)
  return (
    <li className="list-group-item">
      <h5 className="mb-1">
        数量：<span className="text-primary">{props.quantity}</span>
      </h5>
      <ul className="list-inline">
        <li className="list-inline-item">
          由 <span className="text-info"></span> 的
          <span className="text-primary"><i className="fa fa-user"></i></span>
          于 <span className="text-secondary"></span> 申请
        </li>
        <li className="list-inline-item">
          <span className="text-danger"></span>
          于 <span className="text-secondary"></span> 发放
        </li>
        <li className="list-inline-item">
          <span className="text-success"></span>
          于 <span className="text-muted"></span> 归还，
          <span className="text-success"></span> 确认
        </li>
      </ul>
    </li>
  )
}

function Journal01List(props) {
  const list = props.journalList
  // console.log(list)
  return (
    <ul className="list-group">
      {list.map((item) => {
        <Journal01ListItem item={item}/>
      })}
    </ul>
  )
}

export default class Journal01Filter extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { journalList: [] }
    console.log('props')
    // console.log(props)

    this.filter = this.filter.bind(this)
  }

  componentDidMount() {
    // axios({
    //   method: 'GET',
    //   url: '../api/journal01/',
    //   responseType: 'json'
    // }).then(response => {
    //   console.log(response.data)
    //   this.setState({ journalList: response.data.content })
    //   this.setState({ nn: [1, 2, 3, 4, 5] })
    // })
  }

  filter() {
    console.log(1123)
  }

  render() {
    return (
      <div className="card">
        <div className="card-body row">
          <div className="col-4 form-group">
            <label>日期</label>
            <input type="date" id="date" className="form-control"/>
          </div>
          <div className="col-4 form-group">
            <label>部门</label>
            <input type="text" id="dept" className="form-control"/>
          </div>
          <div className="col-4 form-group">
            <label>用户</label>
            <input type="text" id="user" className="form-control"/>
          </div>
          <div className="clearfix"></div>

          <div className="col-12">
            <button type="button" id="filter" className="btn btn-primary pull-right" onClick={this.filter}>
              <i className="fa fa-search fa-fw"></i> 搜索
            </button>
          </div>
          <div className="clearfix"></div>

          <div className="col-12"><br/></div>

          <div className="col-12">
            <Journal01List journalList={this.state.journalList}/>
          </div>
        </div>
      </div>
    )
  }
}