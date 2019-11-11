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
					<div data-tip={tooltip} data-for={tooltip}>
						<QuestionIcon />
					</div>
					<ReactTooltip 
						className='tool-tip'
						id={tooltip} 
						data-html
						insecure
						effect='solid' 
						multiline 
					/>
				</div>
			}
		</div>
		{ children }
	</div>
)
export default LabelGroup;