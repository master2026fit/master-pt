MASTER PT v1.3 자동 업데이트

1. ZIP 압축 해제
2. GitHub master-pt 저장소 루트에 index.html 및 sw.js 두 파일을 교체/커밋
3. manifest.webmanifest, icon 파일은 기존과 같으므로 교체 불필요
4. GitHub Actions 초록 체크 후 Chrome 및 설치 앱 재실행

작동: HTML은 온라인일 때 네트워크 우선, 오프라인일 때 저장된 앱 사용. 서비스워커는 앱 실행 시 업데이트 확인. 향후 GitHub index.html 수정만으로 새 화면 적용 가능.
주의: 저장 키 master_pt_v1_1 유지. 운동 중 강제 새로고침 없음. 앱 삭제/사이트 데이터 삭제 금지. JSON 백업 권장.
