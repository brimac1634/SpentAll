import React from 'react';
import ReactTooltip from 'react-tooltip'

import { ReactComponent as QuestionIcon } from '../../assets/question.svg'

import './label-group.styles.scss';

const LabelGroup = ({ children, label, tooltip }) => (
	<div className='label-group'>
		<div className='info-group'>
			<span className='label'>{label}</span>
			{
				tooltip &&
				<div>
					<div data-tip={tooltip}>
						<QuestionIcon />
					</div>
					<ReactTooltip effect='solid'/>
				</div>
			}
		</div>
		{ children }
	</div>
)
export default LabelGroup;