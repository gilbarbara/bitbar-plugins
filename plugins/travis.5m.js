#!/usr/bin/env /usr/local/bin/node
const https = require('https');

/* EDIT HERE */
/** The easiest way to get this key is to use the official travis client
 # (`gem install travis`), and run `travis token`. */
const AUTH_TOKEN = '';
/** get the status of both pull requests and commits. */
const INCLUDE_PULL_REQUESTS = false;
const ENTERPRISE = false;
/** set to false to view your repos instead of builds */
const SHOW_BUILDS = true;
const LIMIT_BUILDS = 10;
/* DON'T EDIT BELOW */

const BASE_URL = `api.travis-ci${ENTERPRISE ? '.com' : '.org'}`;
const TRAVIS_URL = 'https://travis-ci.org';
const ICON = 'JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwgL0xlbmd0aCA1IDAgUiAvRmlsdGVyIC9GbGF0ZURlY29kZSA+PgpzdHJlYW0KeAFt2l2OJbtxBOD3XsXZgNoki0VWPWsFevICBjZkYGRA1v4Bf5F1pmfmXkkPtzuGxZ9kZmRksv/5+tvrn6/ePs957/5an/NoxxyvfxS27j5e5+d19+OeQa5zH3ch5zyuV++fo7VxQu62TfDxLdha/d7B+pprBLn7OS+ztzOjXn189rl7fTfXcfWX74IdZ8935330+wPSdu/Td32fa6zMtM9+jCDHlYVrvX1dZ7DRr7ZrV1eb44YcY81jfuS7e9iT8+1zjFovc7V7vPZn68deztedfp8XZM5+Puu1+7h7kOGHnfO17KGtYH2v7Xysd9ip2e/dznYU8rs9v73+nvnb6ufOitc+5v3Byv2zn1dt4rqPmIZJj2tl+tYHKz3IfWXzzNjdSB16zH7liFe/5jVyRNa25/W5YxqbyHIMUciadlybf67Z8tvnudK73WfNY0arQezk+LBauye71leXDccMra1mu0bda/KJHIVP1CX/fjjf/T2eMoc7/PBDZ8rFsfy4L7dTUB9XLjzuEY95D4oLsE/5Xu975p5hzDJXTVUYd+p3Pr/6OM+cs52TeQO40O0jHuCrWdBuLVe0rmPlo33NdS7HXFyjXOoYs7Wrvlr7ON0s667DphMWc/TbcY9mmtxFuxsH3p/jXgen+2Zfey62K+zoM6vOPm0p85zMlq2Z6Dgz49H7te862JzcNXvrTLUvM83V2wzStk37/Z6dtdngXswSa/T7bFwNNPrR8wPX6PZoH8cSnkHaHivz7TH5SX037nPtMtJYGWNjez63UVZlvboy//S+jVxkBZwP4hbn7qu7SAF3nMMNwFY7yosO/l3Huy4WfM553fHTfdlUAi9R2Wcv0/unnHLMeVZ0LlYtouD4tyBwO22tkRPndnlQLsVix1V+405XJufnq7zsXiL5gOztzI+leCqHgPHhq26VbQfHy1nQSSZAJzHHj9OJ85yZ/6+NGMbnbrbozJuvtiOk9gP7/gt2sLjI+/66PvvYk5n7A338ColwkXobttHSjXAS9H+EGusu2/7+uj8nazKUqCvMbD+xn5/eGKA1Qf1voK+d3Z/H3q7v58a+kJ8nshA37UXUz8m/Z/E3NvHKsuvvv1jojdnZn632PdwX133zC47GSrgvIX1llcabZ+gIInCLlyyPhYKIhWIc7NaLxGD8rmh2XpWHINP/MtMZEsxnx8BYAcQMv6upRuOLMNsP4RvVeEyQLa1YhdPf7Y3sXfkFtC/0YtA1hs19z1TYwzIg5LuYAsRRMylqFJJ1mIkji4i7FFO74mTZAbK+k2lqV+3eMmBuba+cdArpO5vpLI4tguyzvpr4oBh5fo4rUR83HEsMuE87mhLB4QiJcP/Ead6fS6NlOovIkVYT+Cfa4Uj3lvXse/Ha1VnPZBmL2s7jOM8Pv8W+ewqZr+/mJx49clU29579cHKkaC7uYKPjdeBLV+QIB6VwjeNjYJV7xMLjc1grKwVbF3L4wr7DFqOLTVZwf8cBEYyP6ECzrZvKiY9YTOJ+G8ak+O0qoz/GIyvGlqR+MXDoimWC1DUkq8fC56pR78uynA2WC70vVOhIXLb049rz3YG6fvEOEQDDT8SJcWjojHege7rjV09jmcPNZ9DbG229i80g5bO1LdeFhAorx+YkPRrCoLfvow7JvFb7ihBXRzJlkJgd+8O1SzLyHmSct1QAITceVWdo5b2MKjln1INl57+MkxiEJGTuZ66ODNkD4nxlquYE053CsLzQuIUIJ3ZLEJrjhODqtsiy8jC+EAq6bgRQ36GHAyQFHLXRg+dQBxfq5buu7ZN1sWv8VbqIY5uKYouauz5PzB83+Zxnv64J4SatNjDx/Qk4yA3LZrWzL+EHc7FOFSTZ+PqAYJQc7lxro1WcHq30bJKOXbUDqVCKyijyzXUaxSMipKSpjdWC4Et6NsvxV+vA2jopkHINlBDZADutnEGPSwEk1chJHoISEqAUDwHwTCWcDJeRrkOU1VRu9HR2mCxIOeT+8Mwu0Yki25WtbnqrBKxJ+1iMx54JkWQ3t1a0h0DbWWpG4h6wzHWzYElmou+ULxOb4tmHF4my42jOwocKkVpLacfILEIwN6STE1Iup0FSsiH2yeO5/B4NJBU7kCM2tDMShJYWSaRYdHGoqEqGgJZCDdGJ0mhEeW5d2ZGpz3EhTaxxsu7HjkcTtkU3Jy4Ts8QrfpY2im54KxqOfK4KKNjVLR+hQQljjBp3qXj2SVO1hWqyACIkrzLKoSwNWaOPyDVScVAc3xAhj8V7L2wpiCz0PZiE0uYHrE1UW4hCahvFrIP1jbHIGcCmDclULoaWCjYoznxGbirgIG5HvQPwLy4d4Ou6BflBOOAzqWOfslE2sJgB6fnhGDcOwOCdUFx+aGfEnb3Z+GERhiSB3NW3zGAzXA523PENCObgCEGw9hFkMOQVxBFmSkNZoV0HUyF3y3EAxzsh+S6Jv2ddzMCz/HC3pOSkh4hBq+RY8sTEsdIeBpeqGNtOHPW5r9noCZh4V6b4QCj6Mn4qecSeG2W4m6SMVFO1rdEE8R1/cjXms1Ms5p5B7uVI8STlDzcYX/0BVVESWs+nb5BAFmQmDpSqAVESuEPxWLMhDh7kVBw04XBkXEKHG0a1Xrl13M54+y235dQVyE1FYHwLDRC3brVxuZU8fodC7TefKhtjcMHpm0iCfCuTi6/wRiKJzYHucEVQS4PWqp3sRP+TK20dnTEJpSQtWdY4l+duAm65US4AIZwy3cVyURuBlBQZ5Y6TU+tTVVYdA/25t1a5XqUhaaRwaUM6iKuknhaqRqVcCYS8a5B7E99cp5eooifU+9aDiIYQrs1LQ8kGcaOUCDBcl2xwmIhqhDBtYj46aSed6DIMsVInnJamhmBLjtDPoGSQf4vvUR+XZkQhPBawpeIQCohoVAhxcFVuUfFk85CeVbpEfUcXwCpNwhLvtuyn80YGJksF7HxZJ7fMdaM6SrTlX2mxwjJBzifwEqUKmqTUAJJrlpMblWXZFV+nr7J1CSD0BXEltiw41UlplQh41hDlyMHdPoehiemtsF6Ke5Fl5+7RnWJnOUQO/XdYLEPVnrh28Br7gzBeJaRhoy6kjMXv3Jfih/57T2/voh8UreDDkOl1XKZSrOxIQ4jozBAlw+McClxVetLWJeaeQaLxyUfKTyEgg2h4hOrlDu2BRIByGvcEk+2i3RwmhTkxGYwQiBunCL9sDzLVJi6+auWanFWLOQIJreS/m35l2ZqKAC3d0YaMXknYuEtln8id7dDCyZfuImKkyY5PpXPS7Y82SL6PrRQV/Wa/aIjS3zU/33SkKI3ziMw0Ki4WREboIinFSKomiBIbjz1zxYCla97n2eRbtuDICZZ0DqJvI5B4e0USbMsSMFyS9GGU1KTKjdLix7w41dDk/tFjWjEl/1JaLWFWqu1Kgyo5Ol4YZWeG+i61RyRipBNb2yX6rMv5IRIfRJ4tHZneQiZKKfmByp5S8uk0IfzkUM4nTSn90mlSR83SSPQw/oBwhnIH+cHNcegp+q+Do71lTgqfdt3ycm6V77nByJs0EYKcSDvmEA/xky8ktCwyEL253qNu1+2WayYUz4x3EmV6Q8aUvPwWe6g4EaFVMCPiZjPOGg2lDaUVRIsSWXwCInIyT1ZTZYQu9aSwu9hNj8FhUmDCSK78V0mZdgWrJAMlNuVDMroQIZJ8nnVWSoCMoiXTfNwKj9JsksmoCaizt33TTDpFkt1UbyXfRdFnAqwi1P0Q7e2Sg4iDnC4i0GXkO7IosSUISHW7+o6SqHUnRKVSVSljqkSqNKthGn0yVSQLMSKTm2PKLgwZjBR4toaS945owaap8Go/uecz/ba0cGIRzcHQNvdADiLOKOqghB5hzIMhp/wvKrEOsVTnmImJ+Gh0F3FWbT0Kvcp/c/3B/dL1cG90i/hNjqdmdtPyFUkqdscCLnIbQ3OGVMUnSGfK0rkwNx+Xk6eVQbnDGE6vGLMWeOObEGRq2Xwp5ZOrj49IkQ+kmYLB66q2bJesrOXFiRKZHOGRPWkXuqz4mfIkMeaGyLFHbEjrslphZygrfqY40CP/Oa4wYW6xH99+xPtb2o6QKOl4v4o3bhWEn8b5RETmCqS64ITY4BTf2cQ7oafZRbxX6Sl63p+5KWyVURGF+Q4rVmfBd1HiQUT5swHVpQI1yxEiTvuhTXNw+06JqHbj22wjDeVOSjrRkNE/8o9DRLFhILFTOtFKYr2B7N07hNnSoE0f5c937tO4Ah4QAfZLRLlb/ARLAzNllPtKv42BdCTulMZuJn11SN5csLxgizQrwkj1lM8MinPGhvmvKvQRRfaFWEsUiS9aVrQapGgri9lnulaYRwouMayXU9Ss0vb2YiLps1Eo+YxpNEILQ0ZhI1pdUAR5jgIJvfyChJ/+eOBERNxV33sIoj0UVUNAhPfwbWQJ8ogOSGeUXog6hKVGTUAovvk1BCsI8yA6A0wOoTjlmKzKyBwYr+c9JZQhT2lFGUZxp1387hHg0ULkueokqAitnDFBaiqPOU8z+cHMZBFF8a8zhYxK4r/Xi8GeDqtdScFMn26t8EdJOY0Uj325tDIwW/e5eiyAbMxpg/DjhJ4cKA34ESYu7/Ak/82ZyzCSL+1BEqie0vOaSQk3H3kgLhVrIXQPVpF65hJfQYS0aIKQW5lKBlFiWRKmLYR2UGg64iXPEHEkG4xrTuPMT1xSVFlTyNCy0bcRnJRAjfMixmUgPK1uO4TCQyFJWjgU0xWpgaSROnkqmbs2ppfKH8lSxWQa5Mbg6lhH7ylxUVtNNyKyWLqUcwxKMy4AgkYwQTpOulMQE7OPMoGpv6O5ZbpY1yhBnV9nvDC/cvhS1w9iLSUlaix9XViKFQnRrn3n2SZcqFYhS6pMZRAsV995W6ryIU2CLKb9wkVTm2KmpSMK4b1VKojZ5wUK5unNfun6p2ZAUhxA0DotF5TbIV4Tn4Le0cg+68GUILGTxEI9BNH/QGkpyFPLFaJ7FkcQtHJh9mlUiyqAsekVbaVxWBNh49J9Oof03uMthdRnXtreHlSYdjIiKlckolAvv04vdMnJ3RsPkiq/dqkV8HoMir14ui6cBMgvov/Ce39Enu8yylxfo6rxWGcJBUQ7pTMhc1nPExRPDilUbzCnI6OFOxZicQ0CDkadPGn0d8RnpIIuneLWKD3zepMVs3n/ZCbillTDU1Is9zG1yqUKDN+5Aj4Ki+SJLOLZV7GZ38loCH+gajLmQbKexzStrS9Mcsfrz1l0pSq3d60iPJWpSaKwhCaaMpbog6WBGFrLo2TVqPgj0UwyIyU1dkLejp+nQKktjybY4+YaEUkjj1spf1OtSMFYwPWK1xTEntjS/LSMOgVFCiSvZy6bS3JpQj5EcavF/EDOp3+Qitg+k7ZgebpnOjfOKAY/BMIHktz9fqooiqBo82LA3zAqNwUWLL3s+Jhwy1kgpI/MBjkJ9xxzcd6qdB1XZfas7/bcGQ5BdpUb7OknVtERJepYEUh+0GI6HnUqLwlax7FXts4wRk5zMkf0/pyz+quFCDuIzEHDhq2iKL8QIRqM95dpvkZ5Kq2gQSh59jZG/VaMiw9q939OnEmnqZIQZUTfW13/I5jOlnIMRlamle4ScxncaYi3hJsGYLw2DsZMy74ilmT6KhWmzm1CkCZNS4ez5s8FUuCll+/Mcd/8pQizJs/LilHR5vT6IxPA3EimDztYOdJJmgiiUs1UCEYnuxDsEvovtuR2DBiRrlHhT0D4WPV/HN+F5g1ND0PmSD3hLyzIl3znunHG06Pj0nmaDD8jvtQY3gFdTxIUoZc/EFFPIKmktj/b7/1Y6ZRuGXkxIU+sx0oFAUVFRkX0V0GbRmxRjkhMO0eV8Ttib1VlMBliksTZyT40LpBjCm1Rlto4WiENDAYme5KtOV91opiSDkSkpkrkzdpW/gYh748JJsel0aQyVx2Ako/0RkFyQ30lpItRNZ3eHSzV+oPkjyDyFTKSZt04tndf9ZkuxjpNJbTr3UD61019/EIIU3vZdkcTbBJtmSgPRuLHdoMfuigIesnvvDGvDX6PP0JEQgLt2aT0W88+jMsLk4UpxZr7ID7kuzxT0D75Lt2JegWhz0MCMLTq5H7Iaxp34s8ujI+nT2FD5fURXdll3FAg/BylbVtPX6XMkJjbTMlIjWTMs57v3IBup4tymmdXocq8eUESNMfwLCnzVvh8Hc+rJOoTLmUESh+f6lNFD3yZyWstM9cl/DCmqayWtllCsUyuF44tCdy6FlYhOvJIkdN93R2ypmalKW7gD0/ICMGQLv5VNVk5AdJXDpYS/XIVGLUBi9NpzUR+SMZpP0P0RNxLEghqn6kC5B2mqAa9tCWgUvt4YlvW8/6RhkV5uOQA4UN5tfiKg3z3YOZ6x4Y+fd6KnjRug7yH89SrvbmdPE0pmDRJ++Z8njccNK7hyPFWVOSVACLJ8K2vEM5nYobyhfk8LTQISVV3dVm3aqMdE5S60npQJ9Z36QWXcsp7Z5bTFEgpHEapx9M/I893+nj2QjohPS/pvvM65VRq//DZsye8Uoi3qIrYWCOvQEZNC6eAzou+YIBIwgKcgf2pmkiF0I5Fg7yF7GViWEgrrqFcrtVUSgpGbtC1JH2VJ7gI629mQkrpQcM8xfHkNJfJd5tTW9M00cbpoqcvoOSLfSsU0juNpWCeTfKHWenDCz0IJYQDtNuU/RR5kPqjiHRdODkVFkySkByFnt6KbccflCYpr4SnxAvJe+SjcuSmCIAaJcRtSnyFKTLP85Yk1ya1lKAuXhGv7lCzCun42yhldJ5n0sIusk4k5o8e7P4n4OJYwmOgHeGAjAkZKUT8kAllqMyn/RAPsPrppTduybxKq0D1Jyeu4U4hkn9wLeyYy/IXkQ/Cf3wVpa174d8yKFna555eyq5CMIOdx/t4rUUGykG11lS71GKpAuxVYuyKyXqT4VqFUOCsZwIdp7q1sgNOCabflgOUbIlT1/0nxaYX90xdTpIQwP3+NC0HeDwJkPLe54+vsRRqTrz+9MekvnQcgvFaNw3xTpmE9+XZQTh3xihGHv//0XqHabNljxAnr5m8RT0T6SXyBj1gWv5HX1/KTymNKSqmMpEy5JeAh/ye2dOb+c/X/2r0rNf/vP7jr//yIvgvT8/5/7++vf5yvv4io+GIBBQa47755fV///X679ff/h/bWnEpCmVuZHN0cmVhbQplbmRvYmoKNSAwIG9iago1Mzk0CmVuZG9iagoyIDAgb2JqCjw8IC9UeXBlIC9QYWdlIC9QYXJlbnQgMyAwIFIgL1Jlc291cmNlcyA2IDAgUiAvQ29udGVudHMgNCAwIFIgPj4KZW5kb2JqCjYgMCBvYmoKPDwgL1Byb2NTZXQgWyAvUERGIF0gL0NvbG9yU3BhY2UgPDwgL0NzMSA3IDAgUiA+PiA+PgplbmRvYmoKOCAwIG9iago8PCAvTGVuZ3RoIDkgMCBSIC9OIDMgL0FsdGVybmF0ZSAvRGV2aWNlUkdCIC9GaWx0ZXIgL0ZsYXRlRGVjb2RlID4+CnN0cmVhbQp4AZ2Wd1RT2RaHz703vdASIiAl9Bp6CSDSO0gVBFGJSYBQAoaEJnZEBUYUESlWZFTAAUeHImNFFAuDgmLXCfIQUMbBUURF5d2MawnvrTXz3pr9x1nf2ee319ln733XugBQ/IIEwnRYAYA0oVgU7uvBXBITy8T3AhgQAQ5YAcDhZmYER/hEAtT8vT2ZmahIxrP27i6AZLvbLL9QJnPW/3+RIjdDJAYACkXVNjx+JhflApRTs8UZMv8EyvSVKTKGMTIWoQmirCLjxK9s9qfmK7vJmJcm5KEaWc4ZvDSejLtQ3pol4aOMBKFcmCXgZ6N8B2W9VEmaAOX3KNPT+JxMADAUmV/M5yahbIkyRRQZ7onyAgAIlMQ5vHIOi/k5aJ4AeKZn5IoEiUliphHXmGnl6Mhm+vGzU/liMSuUw03hiHhMz/S0DI4wF4Cvb5ZFASVZbZloke2tHO3tWdbmaPm/2d8eflP9Pch6+1XxJuzPnkGMnlnfbOysL70WAPYkWpsds76VVQC0bQZA5eGsT+8gAPIFALTenPMehmxeksTiDCcLi+zsbHMBn2suK+g3+5+Cb8q/hjn3mcvu+1Y7phc/gSNJFTNlReWmp6ZLRMzMDA6Xz2T99xD/48A5ac3Jwyycn8AX8YXoVVHolAmEiWi7hTyBWJAuZAqEf9Xhfxg2JwcZfp1rFGh1XwB9hTlQuEkHyG89AEMjAyRuP3oCfetbEDEKyL68aK2Rr3OPMnr+5/ofC1yKbuFMQSJT5vYMj2RyJaIsGaPfhGzBAhKQB3SgCjSBLjACLGANHIAzcAPeIACEgEgQA5YDLkgCaUAEskE+2AAKQTHYAXaDanAA1IF60AROgjZwBlwEV8ANcAsMgEdACobBSzAB3oFpCILwEBWiQaqQFqQPmULWEBtaCHlDQVA4FAPFQ4mQEJJA+dAmqBgqg6qhQ1A99CN0GroIXYP6oAfQIDQG/QF9hBGYAtNhDdgAtoDZsDscCEfCy+BEeBWcBxfA2+FKuBY+DrfCF+Eb8AAshV/CkwhAyAgD0UZYCBvxREKQWCQBESFrkSKkAqlFmpAOpBu5jUiRceQDBoehYZgYFsYZ44dZjOFiVmHWYkow1ZhjmFZMF+Y2ZhAzgfmCpWLVsaZYJ6w/dgk2EZuNLcRWYI9gW7CXsQPYYew7HA7HwBniHHB+uBhcMm41rgS3D9eMu4Drww3hJvF4vCreFO+CD8Fz8GJ8Ib4Kfxx/Ht+PH8a/J5AJWgRrgg8hliAkbCRUEBoI5wj9hBHCNFGBqE90IoYQecRcYimxjthBvEkcJk6TFEmGJBdSJCmZtIFUSWoiXSY9Jr0hk8k6ZEdyGFlAXk+uJJ8gXyUPkj9QlCgmFE9KHEVC2U45SrlAeUB5Q6VSDahu1FiqmLqdWk+9RH1KfS9HkzOX85fjya2Tq5FrleuXeyVPlNeXd5dfLp8nXyF/Sv6m/LgCUcFAwVOBo7BWoUbhtMI9hUlFmqKVYohimmKJYoPiNcVRJbySgZK3Ek+pQOmw0iWlIRpC06V50ri0TbQ62mXaMB1HN6T705PpxfQf6L30CWUlZVvlKOUc5Rrls8pSBsIwYPgzUhmljJOMu4yP8zTmuc/jz9s2r2le/7wplfkqbip8lSKVZpUBlY+qTFVv1RTVnaptqk/UMGomamFq2Wr71S6rjc+nz3eez51fNP/k/IfqsLqJerj6avXD6j3qkxqaGr4aGRpVGpc0xjUZmm6ayZrlmuc0x7RoWgu1BFrlWue1XjCVme7MVGYls4s5oa2u7act0T6k3as9rWOos1hno06zzhNdki5bN0G3XLdTd0JPSy9YL1+vUe+hPlGfrZ+kv0e/W3/KwNAg2mCLQZvBqKGKob9hnmGj4WMjqpGr0SqjWqM7xjhjtnGK8T7jWyawiZ1JkkmNyU1T2NTeVGC6z7TPDGvmaCY0qzW7x6Kw3FlZrEbWoDnDPMh8o3mb+SsLPYtYi50W3RZfLO0sUy3rLB9ZKVkFWG206rD6w9rEmmtdY33HhmrjY7POpt3mta2pLd92v+19O5pdsN0Wu067z/YO9iL7JvsxBz2HeIe9DvfYdHYou4R91RHr6OG4zvGM4wcneyex00mn351ZzinODc6jCwwX8BfULRhy0XHhuBxykS5kLoxfeHCh1FXbleNa6/rMTdeN53bEbcTd2D3Z/bj7Kw9LD5FHi8eUp5PnGs8LXoiXr1eRV6+3kvdi72rvpz46Pok+jT4Tvna+q30v+GH9Av12+t3z1/Dn+tf7TwQ4BKwJ6AqkBEYEVgc+CzIJEgV1BMPBAcG7gh8v0l8kXNQWAkL8Q3aFPAk1DF0V+nMYLiw0rCbsebhVeH54dwQtYkVEQ8S7SI/I0shHi40WSxZ3RslHxUXVR01Fe0WXRUuXWCxZs+RGjFqMIKY9Fh8bFXskdnKp99LdS4fj7OIK4+4uM1yWs+zacrXlqcvPrpBfwVlxKh4bHx3fEP+JE8Kp5Uyu9F+5d+UE15O7h/uS58Yr543xXfhl/JEEl4SyhNFEl8RdiWNJrkkVSeMCT0G14HWyX/KB5KmUkJSjKTOp0anNaYS0+LTTQiVhirArXTM9J70vwzSjMEO6ymnV7lUTokDRkUwoc1lmu5iO/kz1SIwkmyWDWQuzarLeZ0dln8pRzBHm9OSa5G7LHcnzyft+NWY1d3Vnvnb+hvzBNe5rDq2F1q5c27lOd13BuuH1vuuPbSBtSNnwy0bLjWUb326K3tRRoFGwvmBos+/mxkK5QlHhvS3OWw5sxWwVbO3dZrOtatuXIl7R9WLL4oriTyXckuvfWX1X+d3M9oTtvaX2pft34HYId9zd6brzWJliWV7Z0K7gXa3lzPKi8re7V+y+VmFbcWAPaY9kj7QyqLK9Sq9qR9Wn6qTqgRqPmua96nu37Z3ax9vXv99tf9MBjQPFBz4eFBy8f8j3UGutQW3FYdzhrMPP66Lqur9nf19/RO1I8ZHPR4VHpcfCj3XVO9TXN6g3lDbCjZLGseNxx2/94PVDexOr6VAzo7n4BDghOfHix/gf754MPNl5in2q6Sf9n/a20FqKWqHW3NaJtqQ2aXtMe9/pgNOdHc4dLT+b/3z0jPaZmrPKZ0vPkc4VnJs5n3d+8kLGhfGLiReHOld0Prq05NKdrrCu3suBl69e8blyqdu9+/xVl6tnrjldO32dfb3thv2N1h67npZf7H5p6bXvbb3pcLP9luOtjr4Ffef6Xfsv3va6feWO/50bA4sG+u4uvnv/Xtw96X3e/dEHqQ9eP8x6OP1o/WPs46InCk8qnqo/rf3V+Ndmqb307KDXYM+ziGePhrhDL/+V+a9PwwXPqc8rRrRG6ketR8+M+YzderH0xfDLjJfT44W/Kf6295XRq59+d/u9Z2LJxPBr0euZP0reqL45+tb2bedk6OTTd2nvpqeK3qu+P/aB/aH7Y/THkensT/hPlZ+NP3d8CfzyeCZtZubf94Tz+wplbmRzdHJlYW0KZW5kb2JqCjkgMCBvYmoKMjYxMgplbmRvYmoKNyAwIG9iagpbIC9JQ0NCYXNlZCA4IDAgUiBdCmVuZG9iagozIDAgb2JqCjw8IC9UeXBlIC9QYWdlcyAvTWVkaWFCb3ggWzAgMCAxNiAxNl0gL0NvdW50IDEgL0tpZHMgWyAyIDAgUiBdID4+CmVuZG9iagoxMCAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMyAwIFIgPj4KZW5kb2JqCjExIDAgb2JqCihNYWMgT1MgWCAxMC4xMy42IFF1YXJ0eiBQREZDb250ZXh0KQplbmRvYmoKMTIgMCBvYmoKKEQ6MjAxODA4MTEyMjMyMTdaMDAnMDAnKQplbmRvYmoKMSAwIG9iago8PCAvUHJvZHVjZXIgMTEgMCBSIC9DcmVhdGlvbkRhdGUgMTIgMCBSIC9Nb2REYXRlIDEyIDAgUiA+PgplbmRvYmoKeHJlZgowIDEzCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwODY1MiAwMDAwMCBuIAowMDAwMDA1NTEwIDAwMDAwIG4gCjAwMDAwMDg0MjYgMDAwMDAgbiAKMDAwMDAwMDAyMiAwMDAwMCBuIAowMDAwMDA1NDkwIDAwMDAwIG4gCjAwMDAwMDU1OTAgMDAwMDAgbiAKMDAwMDAwODM5MSAwMDAwMCBuIAowMDAwMDA1NjU4IDAwMDAwIG4gCjAwMDAwMDgzNzEgMDAwMDAgbiAKMDAwMDAwODUwNyAwMDAwMCBuIAowMDAwMDA4NTU3IDAwMDAwIG4gCjAwMDAwMDg2MTAgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSAxMyAvUm9vdCAxMCAwIFIgL0luZm8gMSAwIFIgL0lEIFsgPDdhMjRlNmY2MGIyMGUxZTQwYzQ4OTMyMjIxYzE0ZjUxPgo8N2EyNGU2ZjYwYjIwZTFlNDBjNDg5MzIyMjFjMTRmNTE+IF0gPj4Kc3RhcnR4cmVmCjg3MjcKJSVFT0YK';
const ICONS = {
  passed: '✔︎',
  created: '▷',
  starting: '▲',
  started: '▶',
  failed: '✘',
  queued: '⚠',
  errored: '✘',
  canceled: '⃠',
};
const STATUSES = {
  passed: 'green',
  created: 'orange',
  starting: 'orange',
  started: 'orange',
  failed: 'red',
  queued: 'orange',
  errored: 'orange',
  canceled: 'gray',
};

function request(options = {}) {
  const OPTIONS = {
    hostname: BASE_URL,
    path: options.path || '/builds',
    port: 443,
    method: options.method || 'GET',
    headers: {
      'Travis-API-Version': 3,
      Authorization: `token ${AUTH_TOKEN}`,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(OPTIONS, (response) => {
      const { headers, statusCode } = response;

      if (statusCode < 200 || statusCode > 299) {
        reject(new Error(`Request failed - status code: ${response.statusCode}`));
      }

      const isJSON = headers['content-type'].includes('application/json');

      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', chunk => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => {
        const content = body.join('');

        resolve(isJSON ? JSON.parse(content) : content);
      });
    });

    // handle connection errors of the request
    req.on('error', err => reject(err));
    req.end();
  });
}

function timeSince(dateString) {
  const date = new Date(dateString);

  const seconds = Math.floor((new Date() - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  }
  else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    }
    else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      }
      else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = 'hour';
        }
        else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = 'minute';
          }
          else {
            interval = seconds;
            intervalType = 'second';
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return `${interval} ${intervalType}`;
}

function trimString(str, n = 72) {
  return (str.length > n) ? `${str.substr(0, n - 1)}…` : str;
}

function getURL(build) {
  return `${TRAVIS_URL}/${build.repository.slug}/builds/${build.id}`;
}

function getRepoState(repo) {
  let branches = ['master'];

  if (repo.branches) {
    branches = repo.branches;
  }

  return Promise.all(branches.map(branch => request({ path: `/repo/${repo.id}/builds?limit=1&branch.name=${branch}${!INCLUDE_PULL_REQUESTS && '&event_type=push'}` })))
    .then(values => values[0].builds
      .map(build => `${ICONS[build.state]} ${repo.slug} | href=${getURL(build)} color=${STATUSES[build.state]}`)
      .join(''))
    .catch(err => console.log(err.toString()));
}

function formatBuildTitle(data) {
  return `${ICONS[data.state]} ${data.repository.slug} | href=${getURL(data)} color=${STATUSES[data.state]}`;
}

function formatCommit(data) {
  return `${trimString(data.commit.message)} | href=${data.commit.compare_url} color=gray`;
}

function formatTimes(data) {
  return `${timeSince(data.finished_at)} ago | size=12`;
}

function formatBuild(data) {
  return Promise.resolve([
    formatBuildTitle(data),
    formatCommit(data),
    formatTimes(data),
  ].join('\n'));
}

function formatRepo(data) {
  return getRepoState(data);
}

function handleResponse(body) {
  return Promise.all(body.map(SHOW_BUILDS ? formatBuild : formatRepo))
    .then((lines) => {
      const output = lines
        .filter(d => !!d)
        .map(l => `${l}${SHOW_BUILDS ? '\n---\n' : '\n'}`);

      console.log(`|image=${ICON}\n---\n${output.join('')}`);
    });
}

function getData() {
  const path = SHOW_BUILDS
    ? `/builds?limit=${LIMIT_BUILDS}${!INCLUDE_PULL_REQUESTS && '&event_type=push'}`
    : '/repos?active=true&sort_by=name';

  return request({ path })
    .then(d => d[SHOW_BUILDS ? 'builds' : 'repositories'])
    .then(d => handleResponse(d))
    .catch(err => console.log(err.toString()));
}

getData();
