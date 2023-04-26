import React from 'react';
import Container from '../../views/Container';
import CancelNav from '../../views/CancelNav';
import Hr from '../../components/Hr';

export default function LoginLog() {
  return (
    <Container>
      <div className="flex flex-col gap-6">
        <CancelNav />
        <div className="flex flex-col gap-4 gradient-bg2 rounded-xl p-8">
          <div className="gradient-text1 font-title font-bold text-[20px]">Recent login records</div>
          <Hr />
          <table className="table-auto w-full text-left text-[16px]">
            <thead className="text-[#99AC9B]">
              <tr>
                <th className="py-2">Login Time</th>
                <th>Login device</th>
                <th>Login status</th>
                <th>Login Address</th>
              </tr>
            </thead>
            <tbody className="text-[#C2D7C7F6]">
              {new Array(10).fill(null).map((it, idx) => (
                <tr>
                  <td className="py-2">03/30/2023 12:00:00</td>
                  <td>{'admin\'s MacBook Pro'}</td>
                  <td>Login successfully</td>
                  <td>37.128.327.24</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
