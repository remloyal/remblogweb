import {
  Image,
  Divider,
  List,
  Typography,
  Avatar,
  Pagination,
  Button,
  Tooltip,
  Col,
  Row,
} from 'antd'
import React, { useEffect, useState } from 'react'
import './main.less'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { windowSizes } from '../../stores/atom'
import {
  FolderOpenOutlined,
  MessageOutlined,
  AliwangwangOutlined,
  CarryOutOutlined,
  PoweroffOutlined,
  UserOutlined,
  StepForwardOutlined,
} from '@ant-design/icons'
const Index: React.FC = () => {
  const [windowSize, setWindowSize] = useRecoilState(windowSizes)
  return (
    <>
      <div
        className={'home ' + (windowSize.width > 900 ? 'home-pc' : 'home-move')}
      >
        <Lists hover={windowSize.width > 900 ? true : false} />
        <Aside />
      </div>
    </>
  )
}
const data = [
  {
    title: 'Ant Design Title',
    context:
      '欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！',
    time: '2022-11-04',
    brief: 'nt Design Title   nt Design Title',
  },
  {
    title: 'Ant Design Title 2',
    context:
      '欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！',
    time: '2022-11-04',
    brief: 'nt Design Title   nt Design Title',
  },
  {
    title: 'Ant Design Title 3',
    context: 'nt Design Title',
    time: '2022-11-04',
    brief: 'nt Design Title   nt Design Title',
  },
  {
    title: 'Ant Design Title 4',
    context:
      '欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！',
    time: '2022-11-04',
    brief: 'nt Design Title   nt Design Title',
  },
  {
    title: 'Ant Design Title 4',
    context:
      '欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！',
    time: '2022-11-04',
    brief: 'nt Design Title   nt Design Title',
  },
]

const Lists: React.FC = ({ hover }) => {
  const className = 'item' + (hover ? ' item-hover' : '')
  return (
    <>
      <div className="home-list">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={index % 2 === 0 ? className : className + ' item-left'}
            >
              <div className="post_cover">
                <Image
                  preview={false}
                  // height={210}
                  width={'100%'}
                  src="/src/assets/image/002bd8ca60ffa5048f3c9ede5e0f0bf9.jpg"
                />
              </div>
              <div className="home-post-info">
                <div className="post-date">
                  <CarryOutOutlined />
                  发布于{item.time}
                </div>
                <div className="post-title">表提</div>
                <div className="post-meta">
                  <span>
                    <FolderOpenOutlined style={{ color: '#ffcc00' }} />
                    <a href="https://yaya.loveyl.cc/web/">web </a>
                  </span>
                  <span>
                    <AliwangwangOutlined style={{ color: '#ffcc00' }} />
                    122 热度
                  </span>
                  <span className="comments-number">
                    <MessageOutlined style={{ color: '#ffcc00' }} />
                    <a href="https://yaya.loveyl.cc/index.php/2022/04/01/html2canvas-%e5%9b%be%e7%89%87%e8%b7%a8%e5%9f%9f%e4%b8%8e%e6%88%aa%e5%8f%96%e9%ab%98%e5%be%b7%e5%9c%b0%e5%9b%be/#comments">
                      1 评论
                    </a>{' '}
                  </span>
                </div>
                <div className="post-content">{item.context}</div>
              </div>
            </div>
          )
        })}
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </>
  )
}

export const Aside: React.FC = () => {
  // const [text, setText] = useRecoilState(windowSize);
  return (
    <div className="home-aside">
      <div className="card-info">
        <div className="is-center">
          <Avatar
            size={80}
            icon={<UserOutlined />}
            src={'/src/assets/image/002bd8ca60ffa5048f3c9ede5e0f0bf9.jpg'}
          />
          {/* 名称 */}
          <div className="author-info__name">YaYa</div>
          {/* 简介 */}
          <div className="author-info__description">
            A Simple and Card UI Design theme for Hexo
          </div>
        </div>
        <div className="site-data">
          <a href="/archives/">
            <div className="headline">文章</div>
            <div className="length-num">3</div>
          </a>
          <a href="/tags/">
            <div className="headline">标签</div>
            <div className="length-num">1</div>
          </a>
          <a href="/categories/">
            <div className="headline">分类</div>
            <div className="length-num">1</div>
          </a>
        </div>
        <Button
          type="primary"
          className="card-info-btn"
          size="large"
          icon={<PoweroffOutlined />}
        >
          Primary Button
        </Button>
        <div className="card-info-social-icons">
          {[1, 2, 3].map((res, index) => {
            return (
              <Tooltip
                key={index}
                title={() => {
                  return <span className="card-info-tooltip">{res}</span>
                }}
                destroyTooltipOnHide={true}
              >
                <a
                  className="social-icon"
                  href="https://github.com/remloyal"
                  target="_blank"
                  title="Github"
                >
                  <StepForwardOutlined style={{ fontSize: '24px' }} />
                </a>
              </Tooltip>
            )
          })}
        </div>
      </div>
      <Notice />
      <DocumentDirectory />
      <LatestArticles />
      <WebsiteInformation />
    </div>
  )
}

const Notice: React.FC = () => {
  return (
    <div className="card-announcement card-widget">
      <div className="item-headline">
        <StepForwardOutlined style={{ fontSize: '24px', color: 'red' }} />
        <span>公告</span>
      </div>
      <div className="announcement_content">
        如果你在使用中遇到問題，請到{' '}
        <a
          target="_blank"
          rel="noopener external nofollow noreferrer"
          href="https://github.com/jerryc127/hexo-theme-butterfly/issues"
        >
          Github Issues
        </a>{' '}
        或者{' '}
        <a href="/messageboard/" data-pjax-state="">
          留言板
        </a>{' '}
        進行反饋，你也可以加入 QQ 群（由於 QQ 群只能有 500
        人，會定時清理潛水的人，不要同時申請 2 个 QQ 群）
        {/* <div className="social-button">
          <a
            className="button--animated"
            href="https://jq.qq.com/?_wv=1027&amp;k=KU9105XR"
            rel="external nofollow noreferrer"
            target="_blank"
          >
            QQ 1 群 👍
          </a>{" "}
          <a
            className="button--animated"
            href="https://jq.qq.com/?_wv=1027&amp;k=r1nK0DQz"
            rel="external nofollow noreferrer"
            target="_blank"
          >
            QQ 2 群 👍
          </a>{" "}
          <a
            className="button--animated"
            href="https://t.me/bu2fly"
            rel="external nofollow noreferrer"
            target="_blank"
          >
            Telegram 👍
          </a>
        </div> */}
      </div>
    </div>
  )
}

// 文章目录
const DocumentDirectory: React.FC = () => {
  return (
    <div className="card-docs card-widget">
      <div className="item-headline">
        <StepForwardOutlined style={{ fontSize: '24px', color: 'red' }} />
        <span>文檔目錄</span>
      </div>
      <div className="item-content">
        <ul className="card-category-list">
          <li className="card-category-list-item">
            <a
              className="card-category-list-link"
              href="/posts/21cfbf15/"
              data-pjax-state=""
            >
              🚀 快速開始
            </a>
          </li>
          <li className="card-category-list-item">
            <a
              className="card-category-list-link"
              href="/posts/dc584b87/"
              data-pjax-state=""
            >
              📑 主題頁面
            </a>
          </li>
          <li className="card-category-list-item">
            <a
              className="card-category-list-link"
              href="/posts/4aa8abbe/"
              data-pjax-state=""
            >
              🛠 主題配置-1
            </a>
          </li>
          <li className="card-category-list-item">
            <a
              className="card-category-list-link"
              href="/posts/ceeb73f/"
              data-pjax-state=""
            >
              ⚔️ 主題配置-2
            </a>
          </li>
          <li className="card-category-list-item">
            <a
              className="card-category-list-link"
              href="/posts/98d20436/"
              data-pjax-state=""
            >
              ❓ 主題問答
            </a>
          </li>
          <li className="card-category-list-item">
            <a
              className="card-category-list-link"
              href="/posts/4073eda/"
              data-pjax-state=""
            >
              ⚡️ 進階教程
            </a>
          </li>
          <li className="card-category-list-item">
            <a
              className="card-category-list-link"
              href="/posts/198a4240/"
              data-pjax-state=""
            >
              ✨ 更新日誌
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
// 最新文章
const LatestArticles: React.FC = () => {
  return (
    <div className="card-recent-post card-widget">
      <div className="item-headline">
        <StepForwardOutlined style={{ fontSize: '24px', color: 'red' }} />
        <span>最新文章</span>
      </div>
      <div className="item-content">
        {[1, 2, 3, 4, 5, 6].map((res, index) => {
          return (
            <div className="aside-list-item" key={index}>
              <Image
                width={58}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <div className="content">
                <div>當設置 top_img 為 false 時</div>
                <div>
                  <time
                    datetime="2020-10-28T06:15:34.000Z"
                    title="發表於 2020-10-28 14:15:34"
                  >
                    2020-10-28
                  </time>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// 网站资讯
const WebsiteInformation: React.FC = () => {
  let data = [
    {
      name: '文章数目',
      num: 0
    },
    {
      name: '已运行时间',
      num: 0,
      unit: '天'
    },
    {
      name: '本站访客数',
      num: 0
    },
    {
      name: '最后更新时间',
      num: 0,
      unit: '天'
    }
  ]
  return (
    <div className="card-widget card-webinfo">
      <div className="item-headline">
        <i className="fas fa-chart-line"></i>
        <span>网站资讯</span>
      </div>
        {
          data.map((res, index) => {
            return (
              <Row className="webinfo-item" key={index}>
                <Col span={8} className='left'>{res.name}</Col>
                <Col span={8} offset={8} className='right'>
                  { res.unit ? (res.num + res.unit) : res.num}
                </Col>
              </Row>
            )
          })
        }
    </div>
  )
}
export default Index
