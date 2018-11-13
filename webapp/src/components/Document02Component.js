import React from 'react'

export class Document02TableMaster extends React.Component {
  render() {
    return (
      <div>
        <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
          <tbody>
            <tr>
              <td rowSpan="2" width="20%" className="text-center align-middle">CRH</td>
              <td><strong>哈尔滨动车段哈尔滨西动车组运用所</strong></td>
              <td width="15%"></td>
            </tr>
            <tr>
              <td colSpan="2"><strong>一体化作业申请单</strong></td>
            </tr>
          </tbody>
        </table>
        <table className="table table-bordered table-sm" style={{ border: '2px solid black' }}>
          <tbody>
            <tr>
              <td width="15%" className="text-center align-middle">申请单位</td>
              <td colSpan="3" className="text-center align-middle">
                <input type="text" className="form-control" id="dept"
                    defaultValue={this.props.item.dept}
                />
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">申请人</td>
              <td width="35%" className="text-center align-middle">
                <input type="text" className="form-control" id="applicant"
                    defaultValue={this.props.item.applicant}
                />
              </td>
              <td width="15%" className="text-center align-middle">联系电话</td>
              <td width="35%" className="text-center align-middle">
                <input type="text" className="form-control" id="applicantPhone"
                    defaultValue={this.props.item.applicant_phone}
                />
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">作业负责人</td>
              <td width="35%" className="text-center">
                <input type="text" className="form-control" id="leader"
                    defaultValue={this.props.item.leader}
                />
              </td>
              <td width="15%" className="text-center align-middle">联系电话</td>
              <td width="35%" className="text-center">
                <input type="text" className="form-control" id="leaderPhone"
                    defaultValue={this.props.item.leader_phone}
                />
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">作业车组号</td>
              <td colSpan="3" className="text-center align-middle">
                <input type="text" className="form-control" id="train"
                    defaultValue={this.props.item.train}
                />
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">申请作业时间</td>
              <td colSpan="3" className="text-center">
                <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="dateBegin"
                    defaultValue={this.props.item.date_begin}
                />
                <input type="time" className="form-control-sm ml-3" style={{ width: '9rem' }} id="timeBegin"
                    defaultValue={this.props.item.time_begin}
                />
                &nbsp;---&nbsp;
                <input type="date" className="form-control-sm" style={{ width: '9rem' }} id="dateEnd"
                    defaultValue={this.props.item.date_end}
                />
                <input type="time" className="form-control-sm ml-3" style={{ width: '9rem' }} id="timeEnd"
                    defaultValue={this.props.item.time_end}
                />
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">作业内容</td>
              <td colSpan="3" className="text-center align-middle">
                <div className="row">
                  <div className="col-2">
                    <select className="form-control" id="content"
                        value={this.props.item.content}
                    >
                      <option value="普查">普查</option>
                      <option value="检查">检查</option>
                      <option value="故障处理">故障处理</option>
                      <option value="加装改造">加装改造</option>
                      <option value="其它">其它</option>
                    </select>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" id="content_detail"
                        defaultValue={this.props.item.content_detail}
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td width="15%" className="text-center align-middle">施修要求</td>
              <td colSpan="3">
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      <td width="15%" className="text-center align-middle">蓄电池</td>
                      <td className="text-center">
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_xdc === '供' ?
                              <span className="text-danger">
                                <strong>✓供</strong>
                              </span>
                              :
                              <span>▢供</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_xdc" type="radio" value="供" id="p_yq_xdc-0" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_xdc-0">供</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_xdc === '断' ?
                              <span className="text-danger">
                                <strong>✓断</strong>
                              </span>
                              :
                              <span>▢断</span>
                            }
                          </span>
                          :
                            <span>
                              <input name="p_yq_xdc" type="radio" value="断" id="p_yq_xdc-1" disabled={this.props.mode === 'read' ? true : false} />
                              <label htmlFor="p_yq_xdc-1">断</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_xdc === '无要求' ?
                              <span className="text-danger">
                                <strong>✓无要求</strong>
                              </span>
                              :
                              <span>▢无要求</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_xdc" type="radio" value="无要求" id="p_yq_xdc-2" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_xdc-2">无要求</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      </td>
                    </tr>
                    <tr>
                      <td width="15%" className="text-center align-middle">接触网</td>
                      <td className="text-center">
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_jcw === '供' ?
                              <span className="text-danger">
                                <strong>✓供</strong>
                              </span>
                              :
                              <span>▢供</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_jcw" type="radio" value="供" id="p_yq_jcw-0" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_jcw-0">供</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_jcw === '断' ?
                              <span className="text-danger">
                                <strong>✓断</strong>
                              </span>
                              :
                              <span>▢断</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_jcw" type="radio" value="断" id="p_yq_jcw-1" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_jcw-1">断</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_jcw === '无要求' ?
                              <span className="text-danger">
                                <strong>✓无要求</strong>
                              </span>
                              :
                              <span>▢无要求</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_jcw" type="radio" value="无要求" id="p_yq_jcw-2" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_jcw-2">无要求</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      </td>
                    </tr>
                    <tr>
                      <td width="15%" className="text-center align-middle">作业地点</td>
                      <td className="text-center">
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_zydd === '检查库' ?
                              <span className="text-danger">
                                <strong>✓检查库</strong>
                              </span>
                              :
                              <span>▢检查库</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_zydd" type="radio" value="检查库" id="p_yq_zydd-0" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_zydd-0">检查库</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_zydd === '临修库' ?
                              <span className="text-danger">
                                <strong>✓临修库</strong>
                              </span>
                              :
                              <span>▢临修库</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_zydd" type="radio" value="临修库" id="p_yq_zydd-1" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_zydd-1">临修库</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {this.props.mode === 'read' ?
                          <span>
                            {this.state.master.p_yq_zydd === '无要求' ?
                              <span className="text-danger">
                                <strong>✓无要求</strong>
                              </span>
                              :
                              <span>▢无要求</span>
                            }
                          </span>
                          :
                          <span>
                            <input name="p_yq_zydd" type="radio" value="无要求" id="p_yq_zydd-2" disabled={this.props.mode === 'read' ? true : false} />
                            <label htmlFor="p_yq_zydd-2">无要求</label>
                          </span>
                        }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      </td>
                    </tr>
                    <tr>
                      <td width="15%" className="text-center align-middle">其它</td>
                      <td className="text-center align-middle">
                        <input type="text" className="form-control" id="p_yq_qt" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export class ScheduleItem extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.id}</td>
        <td>{this.props.item.train}</td>
        <td>{this.props.item.content}</td>
        <td>{this.props.item.content_detail}</td>
        <td>
          {this.props.item.date_begin} {this.props.item.time_begin}
          <br/>
          {this.props.item.date_end} {this.props.item.time_end}
        </td>
        <td>{this.props.item.dept}</td>
        <td>{this.props.item.leader}</td>
        <td>{this.props.item.leader_phone}</td>
      </tr>
    )
  }
}