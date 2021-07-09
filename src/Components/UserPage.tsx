import React from 'react';
import '../styles/UserPage.css'
import '../styles/LoginPage.css'
import '../styles/ktab.css'
import '../styles/kform.css'
import Kinput from "./Kinput";
import {Table} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default-rtl.css'

const {Column, HeaderCell, Cell, Pagination} = Table;

function UserPage(props: any) {
    const name = "کامیار"
    const price = "10.000"
    return (
        <section className="user-page">
            <div className="user-page__title">
                <div className="user-page__title__welcome">{`  ${name} عزیز خوش آمدید`}</div>
                <div className="user-page__title__balance-msg">{`موجودی حساب شما: ${price}`}</div>
                <button className="user-page__title__balance-btn">افزایش موجودی</button>
            </div>
            <div className="user-page__tab ktab">
                <div className="ktab__icon ktab__icon--right ktab--chosen">پروفایل</div>
                <div className="ktab__icon ktab__icon--left">رسیدها</div>
            </div>
            {/*<div>*/}
            {/*    <div className="kform user-page__form">*/}
            {/*        <div className="kform__row">*/}
            {/*            <Kinput label="نام خانوادگی" left/>*/}
            {/*            <Kinput label="نام" right />*/}
            {/*        </div>*/}
            {/*        <div className="kform__row" style={{marginTop: 10}}>*/}
            {/*            <Kinput label="رمز عبور" type="password" left/>*/}
            {/*            <Kinput label="ایمیل" type="email" right />*/}
            {/*        </div>*/}
            {/*        <div className="kform__row" style={{marginTop: 10}}>*/}
            {/*            <Kinput label="آدرس" big/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <button className="kform__btn">ویرایش اطلاعات</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="user-page__table__container">
                <Table
                    height={400}

                    className="user-page__table"
                    data={[]}
                    onRowClick={data => {
                        console.log(data);
                    }}
                >
                    <Column width={200} fixed="right" align="center" >
                        <HeaderCell>کد پیگیری</HeaderCell>
                        <Cell dataKey="id"/>
                    </Column>

                    <Column width={200} >
                        <HeaderCell>کالا</HeaderCell>
                        <Cell dataKey="firstName"/>
                    </Column>

                    <Column width={200}>
                        <HeaderCell>قیمت پرداخت شده</HeaderCell>
                        <Cell dataKey="lastName"/>
                    </Column>

                    <Column width={200}>
                        <HeaderCell>آدرس ارسال شده</HeaderCell>
                        <Cell dataKey="city"/>
                    </Column>

                </Table>
            </div>


        </section>
    );
}

export default UserPage;