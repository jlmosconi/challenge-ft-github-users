import {type FC} from 'react';
import CONFIG from '@config/environment/current';
import {TypographyText} from '@components/Text/TypographyText';
import SafeArea from '@components/SafeArea';

const HomeScreen: FC = () => {
  return (
    <SafeArea>
      <TypographyText>
        {CONFIG.MODE} - {CONFIG.API.BASE_URL}
      </TypographyText>
    </SafeArea>
  );
};

export default HomeScreen;
