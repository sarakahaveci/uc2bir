/* eslint-disable react/jsx-pascal-case */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/macro';
import { Link } from 'react-router-dom'
import { dtGetServices } from 'actions';
import { Pagination, Svg } from 'components';
import Card from './Card';
import { BlockUserModal } from 'components'

export default function Services() {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.profileSettings2.services);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(undefined);

  useEffect(() => { }, []);
  useEffect(() => {
    dispatch(dtGetServices(page));
  }, [page]);

  function pageChangeHandler(event, value) {
    setPage(value);
  }

  return (
    <div className="w-100 h-100">
      <BlockUserModal
        isBlocked={true}
        open={selectedUser}
        approve={() => {
          setSelectedUser(undefined);
        }}
        cancel={() => {
          setSelectedUser(undefined);
        }}
      />
      <Link style={{ color: 'black' }} to="/myprofile/settings/profile">
        <Header >
          <Svg.ArrowLeftIcon />
          <text style={{ marginLeft: '5px', fontWeight: 'bold' }}>Engellediğim Üyeler</text>
        </Header>
      </Link>
      <CardContainer>
        <Card onClickButton={()=>{setSelectedUser('1')}} image={null} name={'TESTNAME'} data={null} desc="Öğrenci" />
        <Card onClickButton={()=>{setSelectedUser('1')}}  image={null} name={'TESTNAME'} data={null} desc="Öğrenci" />
        <Card onClickButton={()=>{setSelectedUser('1')}}  image={null} name={'TESTNAME'} data={null} desc="Öğrenci" />
        <Card onClickButton={()=>{setSelectedUser('1')}}  image={null} name={'TESTNAME'} data={null} desc="Öğrenci" />
        <Card onClickButton={()=>{setSelectedUser('1')}}  image={null} name={'TESTNAME'} data={null} desc="Öğrenci" />
        <Card onClickButton={()=>{setSelectedUser('1')}}  image={null} name={'TESTNAME'} data={null} desc="Öğrenci" />
        <Card onClickButton={()=>{setSelectedUser('1')}}  image={null} name={'TESTNAME'} data={null} desc="Öğrenci" />

      </CardContainer>
      <Pagination
        mt="50px"
        count={services?.data?.totalPage}
        style={{ background: 'white' }}
        page={page}
        onChange={pageChangeHandler}
      />
    </div>
  );
}

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
const Header = styled.div`
  display:flex;
  margin:15px;

`