/* eslint-disable */
import React from 'react';

import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <section className="page_404">
            <div className="container">
                <div className="four_zero_four_bg">
                    
                </div>

                <div className="contant_box_404">
                    <h1 className="text_404">404</h1>
                    <h3 className="h2">{t('content.title_404')}</h3>
                    <p>{t('content.description_404')}</p>
                    <a href="" className="link_404">{t('content.go_to_home')}</a>
                </div>
            </div>
        </section>

    );
}
export default NotFound;
