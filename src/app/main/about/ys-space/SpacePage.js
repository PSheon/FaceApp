import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Icon,
  Typography,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FuseAnimateGroup } from '@fuse';
import clsx from 'clsx';

const data = [
  {
    id: '1',
    coverImageUrl:
      'https://ys.nat.gov.tw/uploads/space/6ea3c151-df19-8ca2-2490-b23533c0b49b.jpg',
    title: '開放空間',
    description:
      'YS 青年職涯發展中心的空間裡皆以coworking space 的概念，讓青年朋友共聚一堂，隨時交流討論，一起激盪創意',
    features: [
      '開放式展演場所 30坪',
      '可容納人數24-120人',
      '開放式空間適合展覽、表演、大型演講',
      '配備專業燈光、數位投影、高速網路、音響設備等設備'
    ],
    borrowLink: 'openSpace'
  },
  {
    id: '2',
    coverImageUrl:
      'https://ys.nat.gov.tw/uploads/space/a60cbb48-b95c-3342-d0ea-9e97bf2ac9c0.jpg',
    title: '圖資中心',
    description: `● 電影賞析：看電影也可以為找工作做準備!由精彩的影片賞析探索職涯定位、工作體驗、人際關係與職場倫理。
		● 閱讀分享：閱讀帶來新動力，為你開啟就業力!透過閱讀，吸收前人的智慧，讓知識與心靈碰撞出嶄新的火花。
		● 圖書借閱：會員可借閱圖資中心之書籍及報章雜誌。`,
    features: [
      '小型會議與研習空間 10坪',
      '可容納人數9-12人',
      '空間設計極具隱密性，可提供小行會議或研習',
      '配備每日報紙與每月雜誌、藏書量達7500本、投影布幕、移動式投影機等設備。'
    ],
    borrowLink: 'capitalCenter'
  },
  {
    id: '3',
    coverImageUrl:
      'https://ys.nat.gov.tw/uploads/space/fb8c2bae-e8fc-e14a-7fcd-1781eef89d20.jpg',
    title: '亮點工作室',
    description: '此空間適合研習講座、教育訓練、腦力激盪、中型會議',
    features: [
      '研習與交流天地 20坪',
      '可容納人數20-32人',
      '此空間適合研習講座、教育訓練、腦力激盪、中型會議',
      '配備數位投影、講桌、投影布幕、移動式投影機、音響等設備'
    ],
    borrowLink: 'highlightStudio'
  },
  {
    id: '4',
    coverImageUrl:
      'https://ys.nat.gov.tw/uploads/space/3227acae-a312-53cc-6bed-73d1b991c2dc.jpg',
    title: '團體施測室',
    description:
      '履歷建置:透過網站會員可自助建置自我的履歷並於直接寄送給欲應徵之廠商。 職涯探索:多種的職涯測評工具可供選擇，有職 涯諮詢師協助您釐清職涯。 WIFI：透過「iTaiwan」的無線網路會員可使用自身之可攜式裝置上網。',
    features: [
      '研討與學習空間 15坪',
      '可容納人數20人',
      '此空間適合舉辦電腦相關課程、線上會議、教育訓練',
      '配備桌上型電腦、電源設備、高速網路、講桌等設備'
    ],
    borrowLink: 'groupTestingRoom'
  },
  {
    id: '5',
    coverImageUrl:
      'https://ys.nat.gov.tw/uploads/space/9a53a7ce-8a9c-8624-b6e4-2c5621b34c3a.jpg',
    title: '履歷製作室',
    description: '提供攝影棚空棚服務',
    features: ['基礎攝影棚', '適合人像拍攝、棚拍、錄製影片']
  },
  {
    id: '6',
    coverImageUrl:
      'https://ys.nat.gov.tw/uploads/space/aa6796d7-daac-f4fa-e5b4-72dd69332b80.jpg',
    title: '商務空間',
    description: `● 創業亮點：創業不該是用想像，而是要更多的實質經驗，找出 您獨樹一格的亮點！YS定期邀請成功創業素人分享經驗。
		● ˙菁英面談會：邀請企業與您在此進行面談會，讓您可以從面談中更貼近企業文化。
		● 各項活動請查詢「線上報名活動」。`,
    features: [
      '小型會議與研習空間 6-8坪',
      '可容納人數6-8人',
      '小空間設計具隱密性，可提供小型商會議、商務協商',
      '配備移動式投影布幕、移動式投影機、移動音響設備等設備'
    ],
    borrowLink: 'businessSpace'
  },
  {
    id: '7',
    coverImageUrl:
      'https://ys.nat.gov.tw/uploads/space/d2d6b911-adca-6091-fffb-a863c699bf21.jpg',
    title: '團體諮詢室',
    description: `● 就業諮詢：提供會員就業相關問題諮詢服務。
		●職涯探索：多種的職涯測評工具可供選擇，有職 涯諮詢師協助您釐清職涯。
		● 創業亮點：創業不該是用想像，而是要更多的實質經驗，找出 您獨樹一格的亮點！邀請成功創業素人分享經驗。`,
    features: [
      '小型會議室5坪',
      '可容納人數6-8人',
      '小空間設計具隱密性，可提供小型商會議、商務協商。',
      '配備投影布幕、移動式投影機、移動音響設備等設備。'
    ],
    borrowLink: 'groupConsultationRoom'
  }
];

const useStyles = makeStyles(theme => ({
  header: {
    background:
      'linear-gradient(to right, ' +
      theme.palette.primary.dark +
      ' 0%, ' +
      theme.palette.primary.main +
      ' 100%)',
    color: theme.palette.primary.contrastText
  },
  panel: {
    margin: 0,
    borderWidth: '1px 1px 0 1px',
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '&:first-child': {
      borderRadius: '16px 16px 0 0'
    },
    '&:last-child': {
      borderRadius: '0 0 16px 16px',
      borderWidth: '0 1px 1px 1px'
    },
    '&$expanded': {
      margin: 'auto'
    }
  }
}));

function SpacePage() {
  const classes = useStyles();
  const USER = useSelector(({ auth }) => auth.user);

  const [expanded, setExpanded] = useState(null);

  const toggleExpansion = panel => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };

  const renderBorrowButton = useCallback(
    space => {
      if (space.borrowLink) {
        if (USER.role.length === 0) {
          return (
            <Link role="button" to="/login">
              <Button
                variant="contained"
                color="primary"
                className="w-full rounded-full"
                aria-label="登入"
                value="legacy"
              >
                請先登入以借用空間
              </Button>
            </Link>
          );
        } else {
          return (
            <Link
              role="button"
              to={`/ys-space/borrow/${space.borrowLink}`}
              className="flex justify-center"
            >
              <Button
                variant="contained"
                color="primary"
                className="w-full md:w-200 rounded-full"
                aria-label="借用空間"
                value="legacy"
              >
                借用 {space.title}
              </Button>
            </Link>
          );
        }
      } else {
        return null;
      }
    },
    [USER.role.length]
  );

  return (
    <div className="w-full flex flex-col flex-auto">
      <div
        className={clsx(
          classes.header,
          'flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-400 sm:h-360'
        )}
      >
        <FuseAnimate
          animation="transition.slideUpIn"
          duration={400}
          delay={100}
        >
          <Typography color="inherit" className="text-36 sm:text-56 font-light">
            室內空間配置
          </Typography>
        </FuseAnimate>

        <FuseAnimate duration={400} delay={600}>
          <Typography
            variant="subtitle1"
            color="inherit"
            className="opacity-75 mt-8 sm:mt-16 mx-auto max-w-512 whitespace-pre-line"
          >
            當您走出電梯，就會看到Youth
            Salon明亮舒適的「公共空間」，除了公共空間的設備外，您也可以向服務台工作人員詢問，借用室內特別規劃的各個空間喔！
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex flex-col flex-1 flex-shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
        <FuseAnimateGroup
          enter={{
            animation: 'transition.slideUpBigIn'
          }}
        >
          <img
            className="object-cover object-center w-full"
            src="https://ys.nat.gov.tw/img/about-space2.png"
            alt="YS 室內配置圖"
          />
          {useMemo(() => {
            return data.map(space => (
              <ExpansionPanel
                classes={{
                  root: classes.panel,
                  expanded: classes.expanded
                }}
                key={space.id}
                expanded={expanded === space.id}
                onChange={toggleExpansion(space.id)}
                elevation={0}
              >
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                  <div className="flex items-center">
                    <Icon className="mr-8" color="action">
                      location_on
                    </Icon>
                    <Typography className="text-24">{space.title}</Typography>
                  </div>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails className="flex flex-col">
                  <img
                    src={space.coverImageUrl}
                    alt={space.title}
                    className="object-cover object-center w-full md:max-w-400 rounded-12 self-center mb-12 shadow-lg"
                  />
                  <Typography className="text-20 whitespace-pre-line">
                    {space.description}
                  </Typography>
                  <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        空間特色
                      </ListSubheader>
                    }
                  >
                    {space.features.map(feature => (
                      <ListItem button key={feature}>
                        <ListItemIcon>
                          <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>

                  {renderBorrowButton(space)}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ));
          }, [classes.expanded, classes.panel, expanded, renderBorrowButton])}
        </FuseAnimateGroup>
      </div>
    </div>
  );
}

export default SpacePage;
