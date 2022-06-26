function findMatches(req, res, next) {

  try {
    const summonerName = req.currentUserId;
    // 이 소환사명으로 이제 검색하고, match 스키마에 저장하면 됨.

    
    
    
  } catch (error) {
    // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
    // 403 코드로 JSON 형태로 프론트에 전달함.
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });

    return;
  }
}

export { findMatches };
