import styled from 'styled-components/native'
import type {IBox} from './types'

export const Box = styled.View<IBox>`
  ${({theme, m}) => (m ? `margin: ${theme.size(theme.spacing(m))}px` : '')};
  ${({theme, mv}) => (mv ? `margin-vertical: ${theme.size(theme.spacing(mv))}px` : '')};
  ${({theme, mt}) => (mt ? `margin-top: ${theme.size(theme.spacing(mt))}px` : '')};
  ${({theme, mb}) => (mb ? `margin-bottom: ${theme.size(theme.spacing(mb))}px` : '')};
  ${({theme, mh}) => (mh ? `margin-horizontal: ${theme.size(theme.spacing(mh))}px` : '')};
  ${({theme, ml}) => (ml ? `margin-left: ${theme.size(theme.spacing(ml))}px` : '')};
  ${({theme, mr}) => (mr ? `margin-right: ${theme.size(theme.spacing(mr))}px` : '')};
  ${({theme, p}) => (p ? `padding: ${theme.size(theme.spacing(p))}px` : '')};
  ${({theme, pv}) => (pv ? `padding-vertical: ${theme.size(theme.spacing(pv))}px` : '')};
  ${({theme, pt}) => (pt ? `padding-top: ${theme.size(theme.spacing(pt))}px` : '')};
  ${({theme, pb}) => (pb ? `padding-bottom: ${theme.size(theme.spacing(pb))}px` : '')};
  ${({theme, ph}) => (ph ? `padding-horizontal: ${theme.size(theme.spacing(ph))}px` : '')};
  ${({theme, pl}) => (pl ? `padding-left: ${theme.size(theme.spacing(pl))}px` : '')};
  ${({theme, pr}) => (pr ? `padding-right: ${theme.size(theme.spacing(pr))}px` : '')};
  ${({theme, h}) => (h ? `height: ${theme.size(theme.spacing(h))}px` : '')};
`
