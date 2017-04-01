import './Preloader.less';
import React, { Component, PropTypes } from 'react'

/** Компонент-обертка для показа прелоадера до вывода вложенного компонента */
class PreloadWrapper extends Component {

    /**
     * @param {bool} fetching Показывать прелоадер или содрежимое
     * @param {bool} blank Прятать содержимое полностью или только затемнять
     * @param {string} error Выводится блок с ошибкой вместо компонента
     * @param {object} Дочерний компонент
     */
    render() {
        const { fetching, blank, error, renderChildren, children } = this.props;

        if (error)
            return <div>
                <h3>Ошибка</h3>
                <div>{error}</div>
            </div>

        if (fetching) {
            if (blank)
                return <dev className='preloader-hover'/>
            else
                return <div>
                    <div className='preloader-hover'/>
                    <div className='preloader-blank-container'>
                        {renderChildren ? renderChildren() : children }
                    </div>
                </div>
        }
        return <div>{renderChildren ? renderChildren() : children}</div>;
    }
}

PreloadWrapper.PropTypes = {
    fetching: PropTypes.bool.isRequired,
    blank: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    renderChildren: PropTypes.object
}

export default PreloadWrapper