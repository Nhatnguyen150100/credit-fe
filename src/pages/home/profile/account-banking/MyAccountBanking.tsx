import { useSelector } from 'react-redux';
import { IRootState } from '../../../../lib/store';
import { ArrowLeftOutlined, CreditCardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function MyAccountBanking() {
  const navigate = useNavigate();
  const user = useSelector((state: IRootState) => state.user);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="h-screen overflow-y-auto w-screen flex flex-col justify-start items-center bg-gray-100 sm:max-w-[450px] sm:border">
        <div className="py-3 px-4 flex justify-between items-center w-full bg-blue-700 border-b border-white">
          <ArrowLeftOutlined
            className="text-white"
            onClick={() => navigate(-1)}
          />
          <span className="text-sm text-white font-light">
            Tài khoản nhận tiền
          </span>
          <CreditCardOutlined className="text-white" />
        </div>
        <div className='flex flex-col justify-start items-start space-y-5 mt-5 w-full'>
          <div className='px-3 pb-3 flex flex-row justify-start items-center space-x-5 border-b w-full'>
            <span className='text-sm text-gray-700'>Ngân hàng nhận tiền</span>
            <span className='uppercase text-base font-medium'>{user.bank_name}</span>
          </div>
          <div className='px-3 pb-3 flex flex-row justify-start items-center space-x-5 border-b w-full'>
            <span className='text-sm text-gray-700'>Số tài khoản nhận tiền</span>
            <span className='uppercase text-base font-medium'>{user.receiving_account_number}</span>
          </div>
        </div>
      </div>
    </div>
  )
}