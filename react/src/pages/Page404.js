import React, { Component } from 'react'
import { Result, Button } from 'antd';

export class Page404 extends Component {
  render() {
    return (
      <>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary" onClick={() => this.props.history.push('/user/')}>
            Back Home
          </Button>}
        />,
      </>
    )
  }
}

export default Page404
