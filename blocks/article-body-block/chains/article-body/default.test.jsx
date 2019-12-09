const React = require('react');
const { mount } = require('enzyme');

describe('article-body chain', () => {
  describe('when it is initialized', () => {
    it('should render correctly with one parent container', () => {
      jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'L57RVT4465HMBKL5T26NBBFBNI',
                type: 'text',
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120767,
                },
                content: 'This is a test article that has all kinds of different element types in it. You should see each element type appear below the bolded text.',
              }, {
                _id: 'E3ZIEEQTXBCWVFPN6DWSGAORE4',
                type: 'text',
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120768,
                },
                content: '<b>Text (two paragraphs with HTML)</b>',
              }, {
                _id: 'HAPKPWEE3ZDV3AEQI6IJHA4S24',
                type: 'text',
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120769,
                },
                content: 'Lorem ipsum <u>dolor sit amet</u>, consectetur adipiscing elit. <i>Nunc nulla ligula</i>, lobortis egestas urna vel, <a href="https://www.lipsum.com/feed/html" target=_blank>pulvinar dapibus nunc</a>. Nulla rutrum, l<b>igula ac rutrum tempor</b>, erat lectus posuere ipsum, quis facilisis velit neque quis erat. Proin massa massa, suscipit et pretium vitae, posuere non turpis.',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: {
            elementPlacement: '{ "1": "2", "2": "1" }',
          },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('article.article-body')).toHaveLength(1);
      expect(wrapper.find('article.article-body').find('div')).toHaveLength(2);
    });
  });

  describe('when it is initialized with elementPlacement greater than contentElements length', () => {
    afterEach(() => {
      jest.resetModules();
    });

    beforeEach(() => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'L57RVT4465HMBKL5T26NBBFBNI',
                type: 'text',
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120767,
                },
                content: 'This is a test article that has all kinds of different element types in it. You should see each element type appear below the bolded text.',
              }, {
                _id: 'E3ZIEEQTXBCWVFPN6DWSGAORE4',
                type: 'text',
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120768,
                },
                content: '<b>Text (two paragraphs with HTML)</b>',
              }, {
                _id: 'HAPKPWEE3ZDV3AEQI6IJHA4S24',
                type: 'text',
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120769,
                },
                content: 'Lorem ipsum <u>dolor sit amet</u>, consectetur adipiscing elit. <i>Nunc nulla ligula</i>, lobortis egestas urna vel, <a href="https://www.lipsum.com/feed/html" target=_blank>pulvinar dapibus nunc</a>. Nulla rutrum, l<b>igula ac rutrum tempor</b>, erat lectus posuere ipsum, quis facilisis velit neque quis erat. Proin massa massa, suscipit et pretium vitae, posuere non turpis.',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: {
            elementPlacement: '{ "1": "2", "2": "4" }',
          },
        })),
      }));
    });
    it('should ignore the child with posistion greater than contentElement.length', () => {
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('article.article-body')).toHaveLength(1);
      expect(wrapper.find('article.article-body').find('div')).toHaveLength(1);
    });
  });


  describe('when it is initalized with no customFields in editor', () => {
    afterEach(() => {
      jest.resetModules();
    });

    beforeEach(() => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'L57RVT4465HMBKL5T26NBBFBNI',
                type: 'text',
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120767,
                },
                content: 'This is a test article that has all kinds of different element types in it. You should see each element type appear below the bolded text.',
              }, {
                _id: 'E3ZIEEQTXBCWVFPN6DWSGAORE4',
                type: 'text',
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120768,
                },
                content: '<b>Text (two paragraphs with HTML)</b>',
              }, {
                _id: 'HAPKPWEE3ZDV3AEQI6IJHA4S24',
                type: 'text',
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120769,
                },
                content: 'Lorem ipsum <u>dolor sit amet</u>, consectetur adipiscing elit. <i>Nunc nulla ligula</i>, lobortis egestas urna vel, <a href="https://www.lipsum.com/feed/html" target=_blank>pulvinar dapibus nunc</a>. Nulla rutrum, l<b>igula ac rutrum tempor</b>, erat lectus posuere ipsum, quis facilisis velit neque quis erat. Proin massa massa, suscipit et pretium vitae, posuere non turpis.',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
    });

    it('should render content from content source correctly', () => {
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('article.article-body').children()).toHaveLength(3);
    });
  });

  describe('when it is initialized with unknown type, it outputs a paragraph with a message ', () => {
    afterEach(() => {
      jest.resetModules();
    });

    beforeEach(() => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'L57RVT4465HMBKL5T26NBBFBNI',
                type: 'tex',
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120767,
                },
                content: 'This is a test article that has all kinds of different element types in it. You should see each element type appear below the bolded text.',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
    });

    it('should render a paragraph with "This element did not match with the elements that are currently implemented:&nbsp;"', () => {
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(<ArticleBodyChain><div>1</div></ArticleBodyChain>);
      expect(wrapper.find('article.article-body').find('p').text()).toMatch('This element did not match with the elements that are currently implemented:');
    });
  });

  describe('when it is initalized with type quotes', () => {
    afterEach(() => {
      jest.resetModules();
    });

    beforeEach(() => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: '44CZ46VGIBBOZAZH4OXB4ND4U4',
                type: 'quote',
                subtype_label: 'pullquote',
                content_elements: [{
                  type: 'text',
                  content: 'A pull quote is for pulling out an individual quote from your story, to highlight it to the reader.',
                  additional_properties: {
                    comments: [],
                    inline_comments: [],
                  },
                  _id: 'HKJ3ZUOCFZBEJJZWGVQZXE6PR1Q',
                }, {
                  type: 'text',
                  content: 'Pull quotes can have multiple paragraphs.',
                  additional_properties: {
                    comments: [],
                    inline_comments: [],
                  },
                  _id: 'LQH5LHMNX5BHJJNDTGGAXUT2O3Y',
                }, {
                  type: 'text',
                  content: 'Here’s a third paragraph.',
                  additional_properties: {
                    comments: [],
                    inline_comments: [],
                  },
                  _id: '3E3BCEBT23NAR7EEGXWI42RZSYQ',
                }],
                subtype: 'pullquote',
                citation: {
                  type: 'text',
                  content: 'A person in your story',
                },
                additional_properties: {
                  _id: 'WT44KGY6HJDL7DN635HUDEHP4ZY',
                  comments: [],
                },
              }, {
                _id: 'CYYF74NCBRF423I4Y6MKQZILWKA',
                type: 'quote',
                content_elements: [{
                  type: 'text',
                  content: 'A block quote is for when you’re citing another text at length. It’s important that it’s formatted differently so that readers know you’re quoting from another source. Block quotes an have multiple paragraphs – this one has 4 total.',
                  additional_properties: {
                    comments: [],
                    inline_comments: [],
                  },
                  _id: 'F6UMSFZWKNANBH5QV5A44CRSRGI',
                }, {
                  type: 'text',
                  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nulla ligula, lobortis egestas urna vel, pulvinar dapibus nunc. Nulla rutrum, ligula ac rutrum tempor, erat lectus posuere ipsum, quis facilisis velit neque quis erat.',
                  additional_properties: {
                    comments: [],
                    inline_comments: [],
                  },
                  _id: 'ULIZJUZ3PZ6CHHKO42KZUZMASDU',
                }, {
                  type: 'text',
                  content: 'Proin massa massa, suscipit et pretium vitae, posuere non turpis. Phasellus vel augue non mi dapibus congue vel vel eros. Cras id mattis metus, eget varius justo. Morbi quis erat quam.',
                  additional_properties: {
                    comments: [],
                    inline_comments: [],
                  },
                  _id: 'UNSELKNBF8BCVRCYKHGIG3FND44',
                }, {
                  type: 'text',
                  content: 'Quisque tristique facilisis lorem, nec interdum nisi tristique vel. Donec dapibus ac velit quis consequat. Donec hendrerit purus risus, congue convallis risus vehicula non. Morbi mi nisi, hendrerit sit amet ornare a, scelerisque posuere nunc. Aliquam metus odio, finibus non pulvinar non, venenatis sit amet sem.',
                  additional_properties: {
                    comments: [],
                    inline_comments: [],
                  },
                  _id: 'KWMRNJ6DJ5D12HJHGFNZF52JGIFI',
                }],
                subtype: 'blockquote',
                citation: {
                  type: 'text',
                  content: 'Lorem Ipsum Generator',
                },
                additional_properties: {
                  _id: '4RTIZEM4Y5CFXI344IF3RO64DCYA',
                  comments: [],
                },
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
    });

    it('should render block and pullquotes correctly', () => {
      const { default: ArticleBodyChain } = require('./default');
      const { default: Pullquote } = require('./_children/pullquote');
      const { default: Blockquote } = require('./_children/blockquote');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('article.article-body').find(Pullquote)).toHaveLength(1);
      expect(wrapper.find('article.article-body').find(Blockquote)).toHaveLength(1);
    });
  });

  describe('unit tests for type table', () => {
    it('should render table correctly', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5asdCD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: '5RGNUWD3RBAOXG6DdaweJKLZSTUM5Q',
                type: 'table',
                header: [
                  {
                    type: 'text',
                    _id: '2TNNJMJ6XZCIPHPe123QJJTUZXHT5M',
                    content: 'Column 1',
                  },
                  {
                    type: 'text',
                    _id: 'TSasdJPMDNZHZF77JPFTYQM2Z2CCM',
                    content: 'Column 2',
                  },
                  {
                    type: 'text',
                    _id: 'DWLCAVKFYVCHBKM5XODBLYdbnRDWI',
                    content: 'Column 3',
                  },
                  {
                    type: 'text',
                    _id: 'OACEBLQAAJEKNA47TX12353TC3FMCGE',
                    content: 'Column 4',
                  },
                ],
                additional_properties: {
                  _id: 'X3HS46FCIFGODICR123kjd.NMVZ25JDEY',
                  comments: [

                  ],
                },
                rows: [
                  [
                    {
                      type: 'text',
                      _id: 'NCVN6M7QNVHZPK;[]5SGZT7BRWJIE',
                      content: 'Row 1',
                    },
                    {
                      type: 'text',
                      _id: 'SAEATQV3KFGYFP2MRp[pnmS7PR77BFQ',
                      content: '<b>Bold</b>',
                    },
                    {
                      type: 'text',
                      _id: 'AIVM5HH3U5FW5IUdasd]HJAK4ZJ3NXU',
                      content: '<b>Bold</b>',
                    },
                    {
                      type: 'text',
                      _id: 'BDCBB6WNURBBBEG3NUQdasdkjdsa7WF4CNE',
                      content: '<b>Bold</b>',
                    },
                  ],
                  [
                    {
                      type: 'text',
                      _id: 'WZasdasd2d13M4E34ECNGPNMKCOGWAQMJJDI',
                      content: 'Row 2',
                    },
                    {
                      type: 'text',
                      _id: 'N3JRDQOXMNHYNETDdlaskhd2UDY37W7YWY',
                      content: '<i>Italic</i>',
                    },
                    {
                      type: 'text',
                      _id: 'RYTQC4CT6FD12312dasd6JGN275JLXVMQIQ',
                      content: '<i>Italic</i>',
                    },
                    {
                      type: 'text',
                      _id: 'RYNFLRWNLRFLFOC2Basd987P6NPSIR6M',
                      content: '<i>Italic</i>',
                    },
                  ],
                  [
                    {
                      type: 'text',
                      _id: 'V6EEDBLTJ0-293123FGZJIHQBMEIWER2EI',
                      content: 'Row 3',
                    },
                    {
                      type: 'text',
                      _id: 'PN22E5MLF5FEVNO23123dsad4U2X3EWSZAU',
                      content: '<u>Underline</u>',
                    },
                    {
                      type: 'text',
                      _id: 'R53123123HJQUOMFFBBFAGW42G5YF7VQ',
                      content: '<u>Underline</u>',
                    },
                    {
                      type: 'text',
                      _id: 'GL57G7MP4VG3BIG4UYE3JVCFJY',
                      content: '<u>Underline</u>',
                    },
                  ],
                  [
                    {
                      type: 'text',
                      _id: 'QMLAUA2K5NFYJAZRUDPOY3ES123123V4',
                      content: 'Row 4',
                    },
                    {
                      type: 'text',
                      _id: 'JWWCXFBHWNB6JO4123123asdasDBUVHQILH3Q',
                      content: 'Multiple paragraphs lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    },
                    {
                      type: 'text',
                      _id: 'O2PGG542P5GBNCasdasd123YDRLRH6T2BOA',
                      content: 'Multiple paragraphs lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    },
                    {
                      type: 'text',
                      _id: 'YOGUWFM2JBB7FOI2O;ljk;lk;123X4FD6G5LE',
                      content: 'Multiple paragraphs lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    },
                  ],
                ],
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const { default: Table } = require('./_children/table');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find(Table)).toHaveLength(1);
    });

    it('should render nothing if no table data is provided', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: '5RGNUWD3RBAOXG6DJKLZSTUM5Q',
                type: 'table',
                header: [
                  {
                    type: 'text',
                    _id: '2TNNJMJ6XZCIPHPQJJTUZXHT5M',
                    content: 'Column 1',
                  },
                  {
                    type: 'text',
                    _id: 'TSJPMDNZHZF77JPFTYQM2Z2CCM',
                    content: 'Column 2',
                  },
                  {
                    type: 'text',
                    _id: 'DWLCAVKFYVCHBKM5XODBLYRDWI',
                    content: 'Column 3',
                  },
                  {
                    type: 'text',
                    _id: 'OACEBLQAAJEKNA47TXTC3FMCGE',
                    content: 'Column 4',
                  },
                ],
                additional_properties: {
                  _id: 'X3HS46FCIFGODICRNMVZ25JDEY',
                  comments: [

                  ],
                },
                rows: '',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const { default: Table } = require('./_children/table');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find(Table)).toHaveLength(0);
    });
  });

  describe('oembed is rendered correctly', () => {
    it('should render Oembed correctly', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                type: 'oembed_response',
                subtype: 'youtube',
                _id: '3OYDYWUAK5D4XP5WJ6PLS4KHYQ',
                raw_oembed: {
                  width: 480,
                  author_name: 'Washington Post',
                  height: 270,
                  type: 'youtube',
                  provider_url: 'https://www.youtube.com/',
                  thumbnail_width: 480,
                  author_url: 'https://www.youtube.com/user/WashingtonPost',
                  thumbnail_height: 360,
                  provider_name: 'YouTube',
                  version: '1.0',
                  html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/817CYL6KuGo?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                  title: 'How to grocery shop | Teach Dave to Cook',
                  thumbnail_url: 'https://i.ytimg.com/vi/817CYL6KuGo/hqdefault.jpg',
                  _id: 'https://www.youtube.com/watch?v=817CYL6KuGo',
                  additional_properties: {
                    comments: [

                    ],
                    _id: 1572984379576,
                  },
                },
                referent: {
                  id: 'https://www.youtube.com/watch?v=817CYL6KuGo',
                  service: 'oembed',
                  type: 'youtube',
                  provider: 'https://www.youtube.com/oembed?url=',
                  referent_properties: {
                    additional_properties: {
                      comments: [

                      ],
                      _id: 1572984379576,
                    },
                  },
                },
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const { default: Oembed } = require('./_children/oembed');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find(Oembed)).toHaveLength(1);
    });

    it('should not render anything when no data is provided', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                type: 'oembed_response',
                subtype: 'youtube',
                _id: '3OYDYWUAK5D4XP5WJ6PLS4KHYQ',
                raw_oembed: '',
                referent: {
                  id: 'https://www.youtube.com/watch?v=817CYL6KuGo',
                  service: 'oembed',
                  type: 'youtube',
                  provider: 'https://www.youtube.com/oembed?url=',
                  referent_properties: {
                    additional_properties: {
                      comments: [

                      ],
                      _id: 1572984379576,
                    },
                  },
                },
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const { default: Oembed } = require('./_children/oembed');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find(Oembed)).toHaveLength(0);
    });
  });

  describe('Header is rendered correctly', () => {
    it('should render header correctly', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'CF5ARXXK6BHJ5LO45DZCCBHL7U',
                type: 'header',
                level: 3,
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120776,
                },
                content: 'Heading 3 - <b>bold</b> <i>italic</i> <u>underline</u> <a href="https://www.washingtonpost.com/" target=_blank>hyperlink</a>',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));

      const { default: ArticleBodyChain } = require('./default');
      const { default: Header } = require('./_children/heading');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find(Header)).toHaveLength(1);
    });

    it('should render nothing when no content for header is provided', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'CF5ARXXK6BHJ5LO45DZCCBHL7U',
                type: 'header',
                level: 3,
                additional_properties: {
                  comments: [],
                  inline_comments: [],
                  _id: 1563473120776,
                },
                content: '',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));

      const { default: ArticleBodyChain } = require('./default');
      const { default: Header } = require('./_children/heading');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find(Header)).toHaveLength(0);
    });
  });

  describe('correction text is rendered correctly', () => {
    it('should render correction text', () => {
      jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'TCBM2JRT4ZA27BU2X47KATFTFA',
                type: 'correction',
                correction_type: 'correction',
                additional_properties: {
                  _id: 'DKRZMRK2ZZF7BI2XGZ3V7FDGEI',
                  comments: [

                  ],
                },
                text: "This is a correction. An editor might add this if the story had a mistake. It will say what the error was and what it has been corrected to.\n\nThis is a second paragraph of a correction. \n\nHere's a third paragraph.  ",
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('.correction')).toHaveLength(1);
    });

    it('should not render correction when no data is provided', () => {
      jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'TCBM2JRT4ZA27BU2X47KATFTFA',
                type: 'correction',
                correction_type: 'correction',
                additional_properties: {
                  _id: 'DKRZMRK2ZZF7BI2XGZ3V7FDGEI',
                  comments: [],
                },
                text: '',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('.correction')).toHaveLength(0);
    });
  });

  describe('Render List correctly', () => {
    it('should render List', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                type: 'list',
                list_type: 'ordered',
                items: [
                  {
                    type: 'text',
                    content: 'Indented under 2',
                    _id: 'OWQEXQT6N5BTPF2CDZYVND6IAQ',
                    additional_properties: {
                      comments: [

                      ],
                      inline_comments: [

                      ],
                    },
                    block_properties: {

                    },
                  },
                  {
                    type: 'text',
                    content: 'Another thing indented under 2',
                    _id: 'UG52XTXHHRDN5KUPKCGTKE4NMM',
                    additional_properties: {
                      comments: [

                      ],
                      inline_comments: [

                      ],
                    },
                    block_properties: {

                    },
                  },
                ],
                _id: 'FLXZDZLOFRGNLMALFGLJGLDPAM',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const { default: List } = require('./_children/list');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find(List)).toHaveLength(1);
    });
    it('should not render List', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                type: 'list',
                list_type: 'ordered',
                items: [],
                _id: 'FLXZDZLOFRGNLMALFGLJGLDPAM',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const { default: List } = require('./_children/list');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find(List)).toHaveLength(0);
    });
  });

  describe('Render raw html correctly', () => {
    it('should render raw html', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'IJGZ4GDLZNBE7JNYTGRQJO726Y',
                type: 'raw_html',
                additional_properties: {
                  _id: 'A4RMUXKSNBC23ENVIPMVSGSRLU',
                  comments: [

                  ],
                },
                content: '<div class="empty" style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;">This is a Sample HTML block. Writers can embed HTML into their stories, so they can use widgets / iFrames / graphics / maps / etc.</div>',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('div').html()).toMatch('<div class="empty" style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;">This is a Sample HTML block. Writers can embed HTML into their stories, so they can use widgets / iFrames / graphics / maps / etc.</div>');
    });
    it('should not render raw html', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'IJGZ4GDLZNBE7JNYTGRQJO726Y',
                type: 'raw_html',
                additional_properties: {
                  _id: 'A4RMUXKSNBC23ENVIPMVSGSRLU',
                  comments: [

                  ],
                },
                content: '',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('div').length).toBe(0);
    });
  });

  describe('Render interstital link correctly', () => {
    it('should render interstitial link', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'PSVIFT7LIVGX7HUE3U2BXGTOHE',
                type: 'interstitial_link',
                additional_properties: {
                  _id: 'WB33NPOSTFGM3IZJ7S3XWS7OC4',
                  comments: [

                  ],
                },
                url: 'https://www.washingtonpost.com/',
                content: 'An interstitial link directs a reader to a related story',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('a').html()).toMatch('An interstitial link directs a reader to a related story');
      expect(wrapper.find('a').prop('href')).toMatch('https://www.washingtonpost.com/');
    });
    it('should not render interstitial link', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'PSVIFT7LIVGX7HUE3U2BXGTOHE',
                type: 'interstitial_link',
                additional_properties: {
                  _id: 'WB33NPOSTFGM3IZJ7S3XWS7OC4',
                  comments: [

                  ],
                },
                url: '',
                content: '',
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('a').length).toBe(0);
    });
  });

  describe('Render image correctly', () => {
    it('should render image with figcaption and author', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'CITIAYX2ERDOPP2TPJGEUV7SNQ',
                additional_properties: {
                  fullSizeResizeUrl: '/photo/resize/x3tXYyoI4592s_zt6DAIHhv2kEw=/arc-anglerfish-arc2-prod-corecomponents/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
                  galleries: [
                    {
                      headlines: {
                        basic: 'A day at the beach',
                      },
                      _id: 'ZMTIFZGC2NCYTDVU7GIGHJKEUY',
                    },
                  ],
                  ingestionMethod: 'manual',
                  keywords: [

                  ],
                  mime_type: 'image/jpeg',
                  originalName: 'DeathtoStock_EnergyandSerenity4.jpg',
                  originalUrl: 'https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
                  owner: 'sara.carothers@washpost.com',
                  proxyUrl: '/photo/resize/x3tXYyoI4592s_zt6DAIHhv2kEw=/arc-anglerfish-arc2-prod-corecomponents/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
                  published: true,
                  resizeUrl: 'http://thumbor-prod-us-east-1.photo.aws.arc.pub/x3tXYyoI4592s_zt6DAIHhv2kEw=/arc-anglerfish-arc2-prod-corecomponents/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
                  restricted: false,
                  thumbnailResizeUrl: 'http://thumbor-prod-us-east-1.photo.aws.arc.pub/aMX7W71KcKyhfbNdL5RBDpt4RY8=/300x0/arc-anglerfish-arc2-prod-corecomponents/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
                  version: 1,
                  comments: [

                  ],
                  _id: 'VRN2LG34XNDX5MZD64SPU4UNYY',
                },
                address: {

                },
                alt_text: 'A person walks down a path with their surfboard towards the ocean.',
                caption: "Australia's great ocean road is home to the kind of stuff you see in magazines and always wish you could visit one day: Twelve Apostles, Koalas, Kangaroos, surf towns, Bells Beach and Point Break. ",
                created_date: '2019-07-09T22:26:02Z',
                credits: {
                  affiliation: [
                    {
                      name: 'Death to Stock Photo',
                      type: 'author',
                    },
                  ],
                  by: [
                    {
                      byline: 'Brett Danielsen (custom credit)',
                      name: 'Brett Danielsen',
                      type: 'author',
                    },
                  ],
                },
                distributor: {
                  mode: 'reference',
                  reference_id: '508c6d12-f2bb-47db-a836-b2b5de225c43',
                },
                height: 3744,
                image_type: 'photograph',
                last_updated_date: '2019-07-09T22:29:42Z',
                licensable: false,
                owner: {
                  id: 'corecomponents',
                  sponsored: false,
                },
                source: {
                  name: 'Death to Stock Photo',
                  source_type: 'stock',
                  edit_url: 'https://corecomponents.arcpublishing.com/photo/CITIAYX2ERDOPP2TPJGEUV7SNQ',
                  system: 'Anglerfish',
                },
                subtitle: 'Australia surf trip',
                taxonomy: {
                  associated_tasks: [

                  ],
                },
                type: 'image',
                url: 'https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
                version: '0.9.0',
                width: 5616,
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('figure').length).toEqual(1);
      expect(wrapper.find('figure').find('img').length).toEqual(1);
      expect(wrapper.find('figure').find('figcaption').length).toEqual(1);
      expect(wrapper.find('figure').find('figcaption').find('p').length).toEqual(1);
      expect(wrapper.find('figure').find('figcaption').find('p').text()).toMatch('Brett Danielsen');
    });
    it('should not render image with figcaption and author', () => {
      jest.mock('fusion:context', () => ({
        useFusionContext: jest.fn(() => ({
          globalContent: {
            _id: '22ACHIRFI5CD5GRFON6AL3JSJE',
            type: 'story',
            version: '0.10.2',
            content_elements: [
              {
                _id: 'CITIAYX2ERDOPP2TPJGEUV7SNQ',
                additional_properties: {
                  fullSizeResizeUrl: '/photo/resize/x3tXYyoI4592s_zt6DAIHhv2kEw=/arc-anglerfish-arc2-prod-corecomponents/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
                  galleries: [
                    {
                      headlines: {
                        basic: 'A day at the beach',
                      },
                      _id: 'ZMTIFZGC2NCYTDVU7GIGHJKEUY',
                    },
                  ],
                  ingestionMethod: 'manual',
                  keywords: [

                  ],
                  mime_type: 'image/jpeg',
                  originalName: 'DeathtoStock_EnergyandSerenity4.jpg',
                  originalUrl: 'https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
                  owner: 'sara.carothers@washpost.com',
                  proxyUrl: '/photo/resize/x3tXYyoI4592s_zt6DAIHhv2kEw=/arc-anglerfish-arc2-prod-corecomponents/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
                  published: true,
                  resizeUrl: 'http://thumbor-prod-us-east-1.photo.aws.arc.pub/x3tXYyoI4592s_zt6DAIHhv2kEw=/arc-anglerfish-arc2-prod-corecomponents/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
                  restricted: false,
                  thumbnailResizeUrl: 'http://thumbor-prod-us-east-1.photo.aws.arc.pub/aMX7W71KcKyhfbNdL5RBDpt4RY8=/300x0/arc-anglerfish-arc2-prod-corecomponents/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg',
                  version: 1,
                  comments: [

                  ],
                  _id: 'VRN2LG34XNDX5MZD64SPU4UNYY',
                },
                address: {

                },
                alt_text: 'A person walks down a path with their surfboard towards the ocean.',
                caption: "Australia's great ocean road is home to the kind of stuff you see in magazines and always wish you could visit one day: Twelve Apostles, Koalas, Kangaroos, surf towns, Bells Beach and Point Break. ",
                created_date: '2019-07-09T22:26:02Z',
                credits: {
                  affiliation: [
                    {
                      name: 'Death to Stock Photo',
                      type: 'author',
                    },
                  ],
                },
                distributor: {
                  mode: 'reference',
                  reference_id: '508c6d12-f2bb-47db-a836-b2b5de225c43',
                },
                height: 3744,
                image_type: 'photograph',
                last_updated_date: '2019-07-09T22:29:42Z',
                licensable: false,
                owner: {
                  id: 'corecomponents',
                  sponsored: false,
                },
                source: {
                  name: 'Death to Stock Photo',
                  source_type: 'stock',
                  edit_url: 'https://corecomponents.arcpublishing.com/photo/CITIAYX2ERDOPP2TPJGEUV7SNQ',
                  system: 'Anglerfish',
                },
                subtitle: 'Australia surf trip',
                taxonomy: {
                  associated_tasks: [

                  ],
                },
                type: 'image',
                url: '',
                version: '0.9.0',
                width: 5616,
              },
            ],
          },
          arcSite: 'the-sun',
          customFields: { },
        })),
      }));
      const { default: ArticleBodyChain } = require('./default');
      const wrapper = mount(
        <ArticleBodyChain>
          <div>1</div>
          <div>2</div>
          <span>3</span>
        </ArticleBodyChain>,
      );
      expect(wrapper.find('figure').length).toEqual(0);
      expect(wrapper.find('figure').find('img').length).toEqual(0);
      expect(wrapper.find('figure').find('figcaption').length).toEqual(0);
      expect(wrapper.find('figure').find('figcaption').find('p').length).toEqual(0);
    });
  });
});