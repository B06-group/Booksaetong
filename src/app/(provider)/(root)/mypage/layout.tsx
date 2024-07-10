import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

function MypageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row max-w-[1224px] min-h-fit mx-auto my-10">
      <nav className="border w-[200px] h-[400px] py-10 rounded-md">
        <ul className="flex flex-col text-sm cursor-pointer text-gray-600">
          <Link href={'./profile'}>
            <li className="flex items-center h-12 hover:bg-hover px-4">
              <Image
                src={'/assets/img/header-profile.png'}
                width={20}
                height={20}
                alt="프로필 아이콘"
                className="mr-2"
              />
              <p>프로필 수정</p>
            </li>
          </Link>
          <Link href={'./likes'}>
            <li className="flex items-center h-12 hover:bg-hover px-4">
              <Image src={'/assets/img/Heart.png'} width={20} height={20} alt="프로필 아이콘" className="mr-2" />
              <p>관심 목록</p>
            </li>
          </Link>
          <Link href={'./mysell'}>
            <li className="flex items-center h-12 hover:bg-hover px-4">
              <Image src={'/assets/img/sale.png'} width={20} height={20} alt="프로필 아이콘" className="mr-2" />
              <p>내 판매글</p>
            </li>
          </Link>
        </ul>
      </nav>
      {children}
    </div>
  );
}

export default MypageLayout;
